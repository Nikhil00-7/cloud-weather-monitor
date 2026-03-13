variable "oac_name" {
  type = string
}

variable "bucket_id" {
  type        = string
  description = "S3 bucket ID to use as CloudFront origin"
}


 
variable "bucket_domain_name" {
  type        = string
  description = "S3 bucket domain name"
}
