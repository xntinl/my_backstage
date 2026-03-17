#!/usr/bin/env node
/**
 * build-catalog.js
 *
 * Concatenates per-client YAML source files into the consolidated catalog files
 * that Backstage reads. Run this after editing any file in clients/_per-client/.
 *
 * Usage: node scripts/build-catalog.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PER_CLIENT_DIR = path.join(ROOT, 'clients', '_per-client');
const CLIENTS_OUT = path.join(ROOT, 'clients', 'clients.yaml');
const PROJECTS_OUT = path.join(ROOT, 'clients', 'projects.yaml');

function readFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8').trim();
  return content.startsWith('---') ? content.slice(3).trim() : content;
}

function buildCatalog() {
  const clientDirs = fs
    .readdirSync(PER_CLIENT_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  const clientDocs = [];
  const projectDocs = [];

  for (const clientName of clientDirs) {
    const clientDir = path.join(PER_CLIENT_DIR, clientName);

    const groupContent = readFile(path.join(clientDir, 'group.yaml'));
    if (groupContent) {
      clientDocs.push(`# --- ${clientName} ---`);
      clientDocs.push(groupContent);
    }

    const projectsContent = readFile(path.join(clientDir, 'projects.yaml'));
    if (projectsContent) {
      projectDocs.push(`# --- ${clientName} projects ---`);
      projectDocs.push(projectsContent);
    }
  }

  const clientsOutput = clientDocs.join('\n---\n') + '\n';
  const projectsOutput = projectDocs.join('\n---\n') + '\n';

  fs.writeFileSync(CLIENTS_OUT, clientsOutput, 'utf8');
  fs.writeFileSync(PROJECTS_OUT, projectsOutput, 'utf8');

  console.log(`✓ clients/clients.yaml  (${clientDirs.length} clients)`);
  console.log(`✓ clients/projects.yaml (${clientDirs.length} clients)`);
  console.log('Done. Restart Backstage or wait for catalog refresh.');
}

buildCatalog();
