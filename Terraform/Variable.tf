variable "app_name" {
   type = string
   default = "weather-app"
}
variable "instance_type" {
  type = string
  default = "t3.micro"
}

data "aws_ssm_parameter" "ubuntu_ami" {
  name = "/aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id"
}


variable "environment" {
    type = string
   default = "dev"
}

variable "oac_name" {
  type = string
  default = "weather-app-oac"
}
variable "application" {
   type = string
   default = "ai-weather-app"
}