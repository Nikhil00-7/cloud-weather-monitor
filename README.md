                           Cloud-Native Weather Monitoring System

## Project Overview

The Cloud-Native Weather Monitoring System is a production-grade, highly available, and scalable web application deployed on AWS using modern DevOps practices and Infrastructure as Code (IaC).

The entire cloud infrastructure is provisioned and managed using Terraform with a modular architecture, ensuring reusable, maintainable, and version-controlled infrastructure deployments.

The application follows a decoupled architecture where the backend is containerized and auto-scaled, while the frontend is globally distributed using a CDN for optimized performance.

## Architecture Overview

🔹 Infrastructure as Code (Terraform – Modular Design)

The complete AWS infrastructure is created using Terraform modules, separating different infrastructure components into reusable blocks such as:
- VPC Module
- Subnet Module (Public & Private)
- Security Group Module
- ALB Module
- Auto Scaling Module
- EC2 Launch Template Module
- S3 & CloudFront Module

* This modular approach ensures:
- Clean project structure
- Reusability across environments (dev/stage/prod)
- Easy scaling and updates
- Industry-level infrastructure design


🔹 Backend Layer (Containerized & Scalable)
- The backend application is:
- Containerized using Docker
- Running on EC2 instances
- Managed by an Auto Scaling Group (ASG)
- Deployed inside private subnets
- Exposed through an Application Load Balancer (ALB)

     ##  Backend Traffic Flow

            User Request

               ⬇ 

   Application Load Balancer (Public Subnet)

               ⬇

        Auto Scaling Group

               ⬇

          EC2 Instances

               ⬇

   Docker Container (Backend Application)

               ⬇

   High availability is achieved using:

               ⬇

        Multi-AZ deployment

               ⬇

       Health checks via ALB

               ⬇

        Auto Scaling policies


🔹 Frontend Layer (Static + CDN Optimized)
- The frontend is:
- Hosted on Amazon S3 (static website hosting)
- Distributed globally using Amazon CloudFront
- Optimized for low latency and caching
- Completely decoupled from backend infrastructure

* Benefits
- Faster global access
- Reduced backend load
- Improved performance
- Cost-efficient architecture

* This improves:
- Performance
- Global availability && Cost efficiency

## Network & Security Design

The infrastructure is deployed inside a custom VPC containing:
- Public Subnets (ALB & NAT Gateway)
- Private Subnets (Backend EC2 instances)
- Internet Gateway
- NAT Gateway
- Security Groups controlling traffic

## Security strategy:
- Backend EC2 instances are not publicly accessible
- Only ALB can communicate with backend instances
- Strict inbound/outbound traffic rules
- Network isolation between public and private layers


