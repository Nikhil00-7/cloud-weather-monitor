resource "aws_launch_template" "weather_app_template"{
    name_prefix = "user-service-launch-template"
    image_id = var.ami
    instance_type = var.instance_type

    vpc_security_group_ids=[
        var.ec2_sg
    ]

user_data = filebase64("${path.root}/scripts/backend.sh")


  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 1
  }

  monitoring {
    enabled = true
  }

   tag_specifications {
    resource_type = "instance"
    tags = {
      Name =  "weather-aap-instance"
    }
  }
}


resource "aws_autoscaling_group" "weather_app_asg" {
  name                      = var.auto_scale_sg_name
  desired_capacity           = 2
  min_size                   = 1
  max_size                   = 4
  vpc_zone_identifier        = var.private_subnets_id

  launch_template {
    id      = aws_launch_template.weather_app_template.id
    version = "$Latest"
  }

  target_group_arns          = [var.target_group]
  health_check_type          = "ELB"
  health_check_grace_period  = 60

  tag {
      key                 = "Name"
      value               = "weather-app-instance"
      propagate_at_launch = true
    }
  
}

resource "aws_autoscaling_policy" "scale_out" {
  name                   = "scale-out"
  scaling_adjustment     = 1
  adjustment_type        = "ChangeInCapacity"
  cooldown               = 300
  autoscaling_group_name = aws_autoscaling_group.weather_app_asg.name
}

resource "aws_autoscaling_policy" "scale_in" {
   name = "scale-in"
   scaling_adjustment = -1
   adjustment_type =  "ChangeInCapacity"
   cooldown =  300
   autoscaling_group_name = aws_autoscaling_group.weather_app_asg.name
}


resource "aws_autoscaling_policy" "target_utilization" {
  
   name                   = "target-tracking-policy"
  autoscaling_group_name = aws_autoscaling_group.weather_app_asg.name
  policy_type            = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 70.0
  }
}

