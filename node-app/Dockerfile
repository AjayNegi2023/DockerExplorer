# Base Image

# FROM ubuntu

# # install node in this image

# RUN apt-get update
# RUN apt install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
# RUN bash /tmp/nodesource_setup.sh
# RUN apt install -y nodejs


# Optimizing image

FROM node:20.19.5-trixie-slim

# copy the source code to docker image
WORKDIR /home/app

COPY package-lock.json package-lock.json
COPY package.json package.json


RUN npm install

COPY index.js index.js

COPY Dockerfile Dockerfile

CMD ["npm","start"]

