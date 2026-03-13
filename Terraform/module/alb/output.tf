output "alb_arn" {
  description = "ARN of the Application Load Balancer"
  value       = aws_alb.name.arn
}

output "alb_dns_name" {
  description = "Public DNS name of the ALB"
  value       = aws_alb.name.dns_name
}

output "alb_zone_id" {
  description = "Hosted zone ID of the ALB (used for Route53)"
  value       = aws_alb.name.zone_id
}

output "target_group_arn" {
  description = "ARN of the ALB target group"
  value       = aws_lb_target_group.weather_app_target_group.arn
}

output "listener_arn" {
  description = "ARN of the ALB listener"
  value       = aws_alb_listener.alb_listener.arn
}
