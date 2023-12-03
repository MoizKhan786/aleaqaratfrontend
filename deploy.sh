#!/bin/bash

# Remove handler
rm -rf code.zip

# Build
npm run build

bucketName=realeastefrontendcode

# Zip the Lambda function code
zip -r code.zip .

# Upload the zip file to S3
aws s3 cp code.zip s3://$bucketName/code.zip