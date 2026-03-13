
output "vpc_id" {
  value = aws_vpc.vpc.id
}


output "public_subnet_ids" {
  value = [
    aws_subnet.public_subnet_1.id,
    aws_subnet.public_subnet_2.id
  ]
}

output "private_subnet_ids" {
  value = [
    aws_subnet.private_subnet_1.id,
    aws_subnet.private_subnet_2.id
  ]
}


output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.IGW.id
}

output "nat_gateway_id" {
  description = "ID of the NAT Gateway"
  value       = aws_nat_gateway.nat_gateway.id
}

