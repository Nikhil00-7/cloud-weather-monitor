variable "ami" {
  type = string
}
variable "instance_type" {
  type = string
}

variable "ec2_sg" {
  type = string
}

variable "auto_scale_sg_name" {
   type = string
}
variable "private_subnets_id" {
  type = list(string)
}

variable "target_group" {
    type = string
} 