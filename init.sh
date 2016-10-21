#!/bin/bash
set -x
exec > >(tee /home/ubuntu/init.log) 2>&1

# Packages
DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
  build-essential \
  git \
  htop \
  nginx-extras

# Node
curl -# -L https://nodejs.org/dist/v6.9.1/node-v6.9.1-linux-x64.tar.gz \
  | sudo tar xzf - --strip-components=1 -C /usr/local

# Front-end build tools
npm install -g \
  webpack \
  pm2

export HOME=/home/ubuntu

sudo chown -R ubuntu:ubuntu $HOME

# Clone app
git clone https://github.com/fisiio/fisi-full.git $HOME/app

# Nginx
cp $HOME/app/nginx.conf /etc/nginx/nginx.conf
nginx -s reload

# copy keys from s3
aws s3 cp s3://fisi-deploy/keys.json $HOME/app --region us-east-1

# install app
cd $HOME/app && \
npm set progress=false && \
sudo -u ubuntu -g ubuntu git checkout master && \
sudo -u ubuntu -g ubuntu npm install --production

cd $HOME/app/browser && \
webpack

sudo -u ubuntu -g ubuntu pm2 start $HOME/app/server.js
