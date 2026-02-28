resource "aws_s3_bucket" "bucket" {
   bucket = var.bucket_name
   
   tags = {
     Name = var.bucket_name
     Environment = var.environment
   }
}


resource "aws_s3_bucket_public_access_block" "private_bucket" {
    bucket = aws_s3_bucket.bucket.id
   block_public_acls = true
   block_public_policy = true
   ignore_public_acls = true
    restrict_public_buckets = true
}  

resource "aws_s3_bucket_versioning" "bucket_version" {
    bucket = aws_s3_bucket.bucket.id

    versioning_configuration {
    status =  "Enabled"
    }
}

resource "aws_kms_key" "mykey" {
  description             = "This key is used to encrypt bucket objects"
  deletion_window_in_days = 10
}

resource "aws_s3_bucket_server_side_encryption_configuration" "encrypt_s3_bucket_data" {
   bucket = aws_s3_bucket.bucket.id

   rule {
     apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.mykey.arn
      sse_algorithm     = "aws:kms"
     }
   }
}


resource "aws_s3_object" "frontend_files" {
  for_each = { for f in fileset("${path.root}/frontend/build", "**/*") : f => f }

  bucket = aws_s3_bucket.bucket.id
  key    = each.value
  source = "${path.root}/../../frontend/build/${each.value}"
  etag   = filemd5("${path.root}/../../frontend/build/${each.value}")

  content_type = lookup(
    {
      "js"   = "application/javascript",
      "css"  = "text/css",
      "html" = "text/html",
      "png"  = "image/png",
      "jpg"  = "image/jpeg",
      "jpeg" = "image/jpeg",
      "ico"  = "image/x-icon",
      "json" = "application/json",
      "txt"  = "text/plain",
      "svg"  = "image/svg+xml"
    },
    lower(
    element(
      split(".", each.value),
      length(split(".", each.value)) - 1
    )
    ),
    "binary/octet-stream"
  )
}


resource "aws_s3_bucket_policy" "bucket_policy" {
    bucket = aws_s3_bucket.bucket.id
    depends_on = [ aws_s3_bucket_public_access_block.private_bucket ]
    policy =  jsonencode({
        Version = "2012-10-17"
        Statement =[{
            Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action =["s3:GetObject"]
        Resource ="${aws_s3_bucket.bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = var.cloudfont_distributer
          }
        }
        }]
    })
}