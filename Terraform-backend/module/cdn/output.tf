
output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution for the frontend"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}


output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.s3_distribution.id
}


output "cloudfront_oac_id" {
  description = "The ID of the CloudFront origin access control (OAC)"
  value       = aws_cloudfront_origin_access_control.oac.id
}


output "cloudfront_viewer_certificate" {
  description = "The ARN of the viewer certificate for CloudFront"
  value       = aws_cloudfront_distribution.s3_distribution.viewer_certificate[0].cloudfront_default_certificate
}

output "cloudfront_default_root_object" {
  description = "The default root object served by CloudFront"
  value       = aws_cloudfront_distribution.s3_distribution.default_root_object
}

output "cloudfront_distribution_arn" {
  description = "The ARN of the CloudFront distribution"
  value       = aws_cloudfront_distribution.s3_distribution.arn
}


