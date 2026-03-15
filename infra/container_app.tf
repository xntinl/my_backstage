resource "azurerm_container_app_environment" "this" {
  name                       = "cae-${var.project}-${var.environment}"
  location                   = azurerm_resource_group.this.location
  resource_group_name        = azurerm_resource_group.this.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.this.id
  infrastructure_subnet_id   = azurerm_subnet.container_apps.id
}

resource "azurerm_container_app" "backstage" {
  name                         = "ca-${var.project}"
  container_app_environment_id = azurerm_container_app_environment.this.id
  resource_group_name          = azurerm_resource_group.this.name
  revision_mode                = "Single"

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.backstage.id]
  }

  registry {
    server   = azurerm_container_registry.this.login_server
    identity = azurerm_user_assigned_identity.backstage.id
  }

  secret {
    name                = "pg-password"
    key_vault_secret_id = azurerm_key_vault_secret.pg_password.versionless_id
    identity            = azurerm_user_assigned_identity.backstage.id
  }

  secret {
    name                = "github-token"
    key_vault_secret_id = azurerm_key_vault_secret.github_token.versionless_id
    identity            = azurerm_user_assigned_identity.backstage.id
  }

  secret {
    name                = "auth-github-client-id"
    key_vault_secret_id = azurerm_key_vault_secret.auth_github_client_id.versionless_id
    identity            = azurerm_user_assigned_identity.backstage.id
  }

  secret {
    name                = "auth-github-client-secret"
    key_vault_secret_id = azurerm_key_vault_secret.auth_github_client_secret.versionless_id
    identity            = azurerm_user_assigned_identity.backstage.id
  }

  secret {
    name                = "auth-microsoft-client-id"
    key_vault_secret_id = azurerm_key_vault_secret.auth_microsoft_client_id.versionless_id
    identity            = azurerm_user_assigned_identity.backstage.id
  }

  secret {
    name                = "auth-microsoft-client-secret"
    key_vault_secret_id = azurerm_key_vault_secret.auth_microsoft_client_secret.versionless_id
    identity            = azurerm_user_assigned_identity.backstage.id
  }

  secret {
    name                = "auth-microsoft-tenant-id"
    key_vault_secret_id = azurerm_key_vault_secret.auth_microsoft_tenant_id.versionless_id
    identity            = azurerm_user_assigned_identity.backstage.id
  }

  secret {
    name                = "azure-devops-token"
    key_vault_secret_id = azurerm_key_vault_secret.azure_devops_token.versionless_id
    identity            = azurerm_user_assigned_identity.backstage.id
  }

  secret {
    name  = "appinsights-cs"
    value = azurerm_application_insights.this.connection_string
  }

  ingress {
    external_enabled = true
    target_port      = 7007
    transport        = "auto"
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  template {
    min_replicas = 1
    max_replicas = 3

    container {
      name   = "backstage"
      image  = "${azurerm_container_registry.this.login_server}/${var.project}:${var.backstage_image_tag}"
      cpu    = 1.0
      memory = "2Gi"

      env { name = "NODE_ENV";                     value = "production" }
      env { name = "NODE_OPTIONS";                  value = "--max_old_space_size=512" }
      env { name = "APP_BASE_URL";                  value = "https://${azurerm_container_app.backstage.ingress[0].fqdn}" }
      env { name = "POSTGRES_HOST";                 value = azurerm_postgresql_flexible_server.this.fqdn }
      env { name = "POSTGRES_PORT";                 value = "5432" }
      env { name = "POSTGRES_USER";                 value = "backstageadmin" }
      env { name = "POSTGRES_PASSWORD";             secret_name = "pg-password" }
      env { name = "GITHUB_TOKEN";                  secret_name = "github-token" }
      env { name = "AUTH_GITHUB_CLIENT_ID";         secret_name = "auth-github-client-id" }
      env { name = "AUTH_GITHUB_CLIENT_SECRET";     secret_name = "auth-github-client-secret" }
      env { name = "AUTH_MICROSOFT_CLIENT_ID";      secret_name = "auth-microsoft-client-id" }
      env { name = "AUTH_MICROSOFT_CLIENT_SECRET";  secret_name = "auth-microsoft-client-secret" }
      env { name = "AUTH_MICROSOFT_TENANT_ID";      secret_name = "auth-microsoft-tenant-id" }
      env { name = "APPLICATIONINSIGHTS_CONNECTION_STRING"; secret_name = "appinsights-cs" }
      env { name = "AZURE_DEVOPS_TOKEN"; secret_name = "azure-devops-token" }
      env { name = "AZURE_DEVOPS_ORG";   value       = var.azure_devops_org }

      startup_probe {
        transport             = "HTTP"
        port                  = 7007
        path                  = "/healthcheck"
        initial_delay_seconds = 5
        period_seconds        = 1
        failure_threshold     = 30
        timeout               = 3
      }

      liveness_probe {
        transport             = "HTTP"
        port                  = 7007
        path                  = "/healthcheck"
        initial_delay_seconds = 10
        period_seconds        = 10
        failure_threshold     = 3
        timeout               = 3
      }

      readiness_probe {
        transport             = "HTTP"
        port                  = 7007
        path                  = "/healthcheck"
        initial_delay_seconds = 10
        period_seconds        = 5
        failure_threshold     = 10
        success_threshold     = 1
        timeout               = 5
      }
    }

    http_scale_rule {
      name                = "http-concurrency"
      concurrent_requests = "50"
    }
  }

  lifecycle {
    ignore_changes = [secret]
  }
}
