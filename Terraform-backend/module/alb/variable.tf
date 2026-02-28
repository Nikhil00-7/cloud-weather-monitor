variable "alb_name" {
  type = string
}
variable "alb_sg" {
 type = list(string)
}

variable "public_subnets" {
   type = list(string)
}

variable "vpc" {
  type = string
}