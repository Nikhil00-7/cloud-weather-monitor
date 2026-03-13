resource "aws_security_group" "alb_sg" {
    name = var.alb_sg_name
   vpc_id =  var.vpc_id
   ingress {
    from_port = 80
    to_port= 80
    protocol = "tcp"
    description= "HTTP traffic allow"
    cidr_blocks = ["0.0.0.0/0"]
   }

   ingress {
    from_port = 443
    to_port= 443
    protocol = "tcp"
    description= "HTTPs traffic allow"
    cidr_blocks = ["0.0.0.0/0"]
   }

   egress  {
      from_port = 0
    to_port= 0
    protocol = "-1"
    description= "all bound of traffic allow"
    cidr_blocks = ["0.0.0.0/0"]
   }
}

resource "aws_security_group" "ec2_sg" {
    name = var.ec2_sg_name
    vpc_id =  var.vpc_id
   ingress {
    from_port = 8000
    to_port= 8000
    protocol = "tcp"
    description= "HTTP traffic allow"
    security_groups = [aws_security_group.alb_sg.id]
   }

   egress  {
      from_port = 0
    to_port= 0
    protocol = "-1"
    description= "all bound of traffic allow"
    cidr_blocks =["0.0.0.0/0"]
   }
}

