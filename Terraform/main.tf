module "vpc" {
  source = "./module/vpc"
}

module "security_groups" {
  source        = "./module/security-group"
  alb_sg_name   = "${var.app_name}-alb"
  ec2_sg_name   = "${var.app_name}-ec2"
  vpc_id        = module.vpc.vpc_id
}

module "alb" {
  source          = "./module/alb"
  public_subnets  = module.vpc.public_subnet_ids
  alb_sg          = [module.security_groups.alb_sg_id]
  vpc          = module.vpc.vpc_id
  alb_name        = "${var.app_name}-alb"
}

module "asg" {
  source               = "./module/asg"
  auto_scale_sg_name   = "${var.app_name}-auto-scale"

  ami                  = data.aws_ssm_parameter.ubuntu_ami.value 
  instance_type        = var.instance_type

  ec2_sg               = module.security_groups.ec2_sg_id
  private_subnets_id   = module.vpc.private_subnet_ids

  target_group    = module.alb.target_group_arn
}

module "s3_bucket" {
  source = "./module/s3-bucket"
  environment = var.environment
cloudfont_distributer =module.cdn.cloudfront_distribution_arn
bucket_name = "${var.application}-bucket"

}

module "cdn" {
  source = "./module/cdn"
   bucket_domain_name = module.s3_bucket.bucket_regional_domain_name
  oac_name = var.oac_name
  bucket_id           = module.s3_bucket.bucket_id  
}