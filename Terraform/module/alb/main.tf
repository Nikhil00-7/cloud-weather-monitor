resource "aws_alb" "name" {
  name               = var.alb_name
  internal           = false
  load_balancer_type = "application"
  security_groups    = var.alb_sg
  subnets            =  var.public_subnets

  enable_deletion_protection = true

  tags = {
    Environment = "production"
  }
}

resource "aws_lb_target_group" "weather_app_target_group" {
   name     = "weather-app-tg"
  port     = 8000
  protocol = "HTTP"
  vpc_id   = var.vpc

  health_check {
    path                = "/health"   
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}

resource "aws_alb_listener" "alb_listener" {
   load_balancer_arn = aws_alb.name.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.weather_app_target_group.arn
  }
}


