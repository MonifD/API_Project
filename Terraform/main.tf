resource "azurerm_resource_group" "rg" {
  location = "West Europe"
  name     = "rg-resources"
}

# Create virtual network
resource "azurerm_virtual_network" "my_terraform_network" {
  name                = "myVnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

# Create subnet
resource "azurerm_subnet" "my_terraform_subnet" {
  name                 = "mySubnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.my_terraform_network.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Create public IPs
resource "azurerm_public_ip" "my_terraform_public_ip" {
  name                = "myPublicIP"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Dynamic"
}

# Create Network Security Group and rule
resource "azurerm_network_security_group" "my_terraform_nsg" {
  name                = "myNetworkSecurityGroup"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = 22  # Utiliser le port 22 pour SSH
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "API"
    priority                   = 1002
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = 3000  # Le port de API
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}


# Create network interface
resource "azurerm_network_interface" "my_terraform_nic" {
  name                = "myNIC"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "my_nic_configuration"
    subnet_id                     = azurerm_subnet.my_terraform_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.my_terraform_public_ip.id
  }
}

# Connect the security group to the network interface
resource "azurerm_network_interface_security_group_association" "example" {
  network_interface_id      = azurerm_network_interface.my_terraform_nic.id
  network_security_group_id = azurerm_network_security_group.my_terraform_nsg.id
}

# Generate random text for a unique storage account name
resource "random_id" "random_id" {
  keepers = {
    resource_group = azurerm_resource_group.rg.name
  }

  byte_length = 8
}

# Create virtual machine
resource "azurerm_linux_virtual_machine" "myTerraformVm" {
  name                = "myVM"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  size                = "Standard_F2"
  admin_username      = var.user

  network_interface_ids = [azurerm_network_interface.my_terraform_nic.id]

  admin_ssh_key {
    username   = var.user
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    name                 = "myOsDisk"
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
  
  provisioner "remote-exec" {
    inline = [
      "${var.password} | sudo -S apt-get update",
      "sudo apt-get install -y docker.io docker-compose",
      "sudo docker login -u ${var.user_docker} -p ${var.password_docker}",
      "sudo docker pull douri/api-c2wk:api-server",
      "sudo docker run -d -p 3000:3000 douri/api-c2wk:api-server",
    ]
  }

  # Additional provisioner for installing Nginx and copying the Nginx configuration
  provisioner "remote-exec" {
    inline = [
      "${var.password} | sudo -S apt-get install -y nginx",
      "sudo rm /etc/nginx/sites-enabled/default",  # Remove the default Nginx site
      "sudo systemctl restart nginx",
    ]
  }

  # Copy Nginx configuration template to VM
  provisioner "file" {
    source      = "./api.conf.tpl"
    destination = "/home/${var.user}/api.conf.tpl"
  }

  # Configure Nginx with the provided template
  provisioner "remote-exec" {
    inline = [
      "sudo mv /home/${var.user}/api.conf.tpl /etc/nginx/sites-available/",
      "sudo ln -s /etc/nginx/sites-available/api.conf.tpl /etc/nginx/sites-enabled/",
      "sudo nginx -s reload",
    ]
  }
}


resource "null_resource" "remote_exemple" {
  connection {
    type = "ssh"
    user = var.user
    private_key = file("~/.ssh/id_rsa")
    host = var.ip
  }
}