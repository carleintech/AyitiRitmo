# scripts/setup-aws-s3.sh

#!/bin/bash

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI
aws configure set aws_access_key_id your_access_key
aws configure set aws_secret_access_key your_secret_key
aws configure set default.region us-east-1

# Create S3 buckets
aws s3 mb s3://ayitiritmo-music --region us-east-1
aws s3 mb s3://ayitiritmo-images --region us-east-1
aws s3 mb s3://ayitiritmo-videos --region us-east-1

# Set bucket policies
aws s3api put-bucket-policy --bucket ayitiritmo-music --policy file://s3-policies/music-bucket-policy.json
aws s3api put-bucket-policy --bucket ayitiritmo-images --policy file://s3-policies/images-bucket-policy.json

# Enable CORS for buckets
aws s3api put-bucket-cors --bucket ayitiritmo-music --cors-configuration file://s3-policies/cors.json

# Set lifecycle policies
aws s3api put-bucket-lifecycle-configuration --bucket ayitiritmo-music --lifecycle-configuration file://s3-policies/lifecycle.json

# scripts/s3-policies/music-bucket-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::ayitiritmo-music/*"]
    },
    {
      "Sid": "AllowApiUploads",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:user/ayitiritmo-api"
      },
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::ayitiritmo-music/*"]
    }
  ]
}

# scripts/s3-policies/cors.json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://your-domain.com"],
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
      "MaxAgeSeconds": 3600,
      "ExposeHeaders": ["ETag"]
    }
  ]
}

# scripts/s3-policies/lifecycle.json
{
  "Rules": [
    {
      "ID": "DeleteIncompleteMultipartUploads",
      "Status": "Enabled",
      "Filter": {},
      "AbortIncompleteMultipartUpload": {
        "DaysAfterInitiation": 1
      }
    },
    {
      "ID": "TransitionOldVersions",
      "Status": "Enabled",
      "Filter": {},
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        }
      ]
    }
  ]
}