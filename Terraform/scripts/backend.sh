#!/bin/bash

# Update packages
apt-get update -y

# Install Docker
apt-get install -y docker.io

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Wait until Docker is active
until systemctl is-active --quiet docker; do
  echo "Waiting for Docker to start..."
  sleep 2
done

# Add ubuntu user to Docker group
usermod -aG docker ubuntu

# Pull latest image
docker pull docdon0007/weather-app:04

# Stop & remove old container if exists
docker rm -f weather_service || true

# Run new container
docker run -d \
  --name weather_service \
  --restart always \
  -p 8000:8000 \
  docdon0007/weather-app:04
