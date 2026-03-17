import {
  CostInsightsApi,
  ProductInsightsOptions,
  Alert,
  Cost,
  Entity,
  Group,
  MetricData,
  Project,
  DEFAULT_DATE_FORMAT,
} from '@backstage-community/plugin-cost-insights';
import { DateTime } from 'luxon';

/**
 * CostInsightsClient agrupado por cliente de la consultora.
 *
 * En producción, reemplazar los métodos de datos por llamadas a la API de
 * facturación real (AWS Cost Explorer, GCP Billing, etc.).
 */
export class ClientCostInsightsClient implements CostInsightsApi {
  private readonly clients = ['acme-corp', 'techstart-inc'];

  private readonly projectsByClient: Record<string, string[]> = {
    'acme-corp': ['acme-erp-modernization', 'acme-self-service-portal'],
    'techstart-inc': ['techstart-ecommerce-platform'],
  };

  private readonly costByClient: Record<string, number> = {
    'acme-corp': 45000,
    'techstart-inc': 12000,
  };

  private generateDailyCosts(
    baseAmount: number,
    intervals: string,
  ): { date: string; amount: number }[] {
    const days = intervals.includes('P90D') ? 90 : intervals.includes('P30D') ? 30 : 14;
    const now = DateTime.now();
    const entries = [];
    for (let i = days; i >= 0; i--) {
      const date = now.minus({ days: i }).toFormat(DEFAULT_DATE_FORMAT);
      const variance = 1 + (Math.random() - 0.5) * 0.2;
      const amount = Math.round((baseAmount / days) * variance);
      entries.push({ date, amount });
    }
    return entries;
  }

  async getLastCompleteBillingDate(): Promise<string> {
    return DateTime.now().minus({ days: 1 }).toFormat(DEFAULT_DATE_FORMAT);
  }

  async getUserGroups(_userId: string): Promise<Group[]> {
    return this.clients.map(client => ({
      id: client,
      name: client
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    }));
  }

  async getGroupProjects(group: string): Promise<Project[]> {
    const projects = this.projectsByClient[group] ?? [];
    return projects.map(p => ({ id: p }));
  }

  async getAlerts(_group: string): Promise<Alert[]> {
    return [];
  }

  async getDailyMetricData(
    _metric: string,
    intervals: string,
  ): Promise<MetricData> {
    const days = intervals.includes('P30D') ? 30 : 14;
    const now = DateTime.now();
    const aggregation = Array.from({ length: days + 1 }, (_, i) => ({
      date: now.minus({ days: days - i }).toFormat(DEFAULT_DATE_FORMAT),
      amount: Math.round(500 + Math.random() * 200),
    }));
    return {
      id: 'daily-active-users',
      format: 'number',
      aggregation,
      change: { ratio: 0.05, amount: 25 },
    };
  }

  async getGroupDailyCost(group: string, intervals: string): Promise<Cost> {
    const base = this.costByClient[group] ?? 10000;
    return {
      id: group,
      aggregation: this.generateDailyCosts(base, intervals),
      change: { ratio: 0.08, amount: base * 0.08 },
      trendline: { slope: 10, intercept: base / 30 },
    };
  }

  async getProjectDailyCost(project: string, intervals: string): Promise<Cost> {
    const clientEntry = Object.entries(this.projectsByClient).find(
      ([, projects]) => projects.includes(project),
    );
    const clientBase = clientEntry ? (this.costByClient[clientEntry[0]] ?? 10000) : 5000;
    const projectCount = clientEntry ? clientEntry[1].length : 1;
    const projectBase = Math.round(clientBase / projectCount);
    return {
      id: project,
      aggregation: this.generateDailyCosts(projectBase, intervals),
      change: { ratio: 0.05, amount: projectBase * 0.05 },
      trendline: { slope: 5, intercept: projectBase / 30 },
    };
  }

  async getCatalogEntityDailyCost(
    catalogEntityRef: string,
    intervals: string,
  ): Promise<Cost> {
    return this.getProjectDailyCost(catalogEntityRef, intervals);
  }

  async getProductInsights(_options: ProductInsightsOptions): Promise<Entity> {
    return {
      id: _options.product,
      aggregation: [0, 0],
      change: { ratio: 0, amount: 0 },
      entities: {},
    };
  }
}
