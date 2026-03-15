resource "azurerm_private_dns_zone" "pg" {
  name                = "${var.project}-${var.environment}.postgres.database.azure.com"
  resource_group_name = azurerm_resource_group.this.name
}

resource "azurerm_private_dns_zone_virtual_network_link" "pg" {
  name                  = "pg-dns-link"
  private_dns_zone_name = azurerm_private_dns_zone.pg.name
  virtual_network_id    = azurerm_virtual_network.this.id
  resource_group_name   = azurerm_resource_group.this.name
}

resource "random_password" "pg" {
  length  = 24
  special = true
}

resource "azurerm_postgresql_flexible_server" "this" {
  name                   = "psql-${var.project}-${var.environment}"
  resource_group_name    = azurerm_resource_group.this.name
  location               = azurerm_resource_group.this.location
  version                = var.pg_version
  delegated_subnet_id    = azurerm_subnet.postgresql.id
  private_dns_zone_id    = azurerm_private_dns_zone.pg.id
  administrator_login    = "backstageadmin"
  administrator_password = random_password.pg.result
  zone                   = "1"
  storage_mb             = 32768
  sku_name               = var.pg_sku
  backup_retention_days  = 7
  auto_grow_enabled      = true

  depends_on = [azurerm_private_dns_zone_virtual_network_link.pg]
}

resource "azurerm_postgresql_flexible_server_database" "backstage" {
  name      = "backstage"
  server_id = azurerm_postgresql_flexible_server.this.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}
