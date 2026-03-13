output "launch_template_id" {
  description = "ID of the Launch Template"
  value       = aws_launch_template.weather_app_template.id
}

output "launch_template_latest_version" {
  description = "Latest version of the Launch Template"
  value       = aws_launch_template.weather_app_template.latest_version
}

output "autoscaling_group_name" {
  description = "Name of the Auto Scaling Group"
  value       = aws_autoscaling_group.weather_app_asg.name
}

output "autoscaling_group_arn" {
  description = "ARN of the Auto Scaling Group"
  value       = aws_autoscaling_group.weather_app_asg.arn
}

output "target_tracking_policy_arn" {
  description = "ARN of the target tracking scaling policy"
  value       = aws_autoscaling_policy.target_utilization.arn
}
