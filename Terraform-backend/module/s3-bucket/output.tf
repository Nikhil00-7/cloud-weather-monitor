output "s3_bucket_name" {
  description = "The name of the S3 bucket hosting the frontend"
  value       = aws_s3_bucket.bucket.id
}

output "s3_bucket_arn" {
  description = "The ARN of the S3 bucket"
  value       = aws_s3_bucket.bucket.arn
}

output "s3_bucket_region" {
  description = "The AWS region where the S3 bucket is created"
  value       = aws_s3_bucket.bucket.region
}

output "kms_key_arn" {
  description = "The ARN of the KMS key used for bucket encryption"
  value       = aws_kms_key.mykey.arn
}

output "cloudfront_s3_policy_id" {
  description = "The ID of the S3 bucket policy for CloudFront access"
  value       = aws_s3_bucket_policy.bucket_policy.id
}


output "frontend_bucket_object_count" {
  value       = length(keys(aws_s3_object.frontend_files))
  description = "Total number of frontend files uploaded to S3"
}

output "bucket_id" {
  value       = aws_s3_bucket.bucket.id
  description = "S3 bucket ID"
}

output "bucket_domain_name" {
  value       = aws_s3_bucket.bucket.bucket_domain_name
  description = "S3 bucket domain name"
}
output "frontend_bucket_url" {
  description = "The regional domain name of the frontend bucket"
  value       = aws_s3_bucket.bucket.bucket_regional_domain_name
}
output "bucket_regional_domain_name" {
  value = aws_s3_bucket.bucket.bucket_regional_domain_name
}

output "frontend_build_files" {
  value = fileset("${path.module}/frontend/build", "**/*")
}
