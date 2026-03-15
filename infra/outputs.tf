output "backstage_url" {
  value = "https://${azurerm_container_app.backstage.ingress[0].fqdn}"
}

output "acr_login_server" {
  value = azurerm_container_registry.this.login_server
}

output "pg_fqdn" {
  value = azurerm_postgresql_flexible_server.this.fqdn
}

output "pg_password" {
  value     = random_password.pg.result
  sensitive = true
}

output "appinsights_connection_string" {
  value     = azurerm_application_insights.this.connection_string
  sensitive = true
}
