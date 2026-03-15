resource "azurerm_user_assigned_identity" "backstage" {
  name                = "id-${var.project}-${var.environment}"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
}
