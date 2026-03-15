variable "project" {
  default = "backstage"
}

variable "environment" {
  default = "prod"
}

variable "location" {
  default = "eastus"
}

variable "pg_sku" {
  default = "B_Standard_B1ms"
}

variable "pg_version" {
  default = "16"
}

variable "backstage_image_tag" {
  default = "latest"
}

variable "auth_github_client_id" {
  sensitive = true
}

variable "auth_github_client_secret" {
  sensitive = true
}

variable "auth_microsoft_client_id" {
  sensitive = true
}

variable "auth_microsoft_client_secret" {
  sensitive = true
}

variable "auth_microsoft_tenant_id" {
  sensitive = true
}

variable "github_token" {
  sensitive = true
}

variable "azure_devops_token" {
  sensitive = true
}

variable "azure_devops_org" {
  description = "Azure DevOps organization name (e.g. 'mycompany' from https://dev.azure.com/mycompany)"
}
