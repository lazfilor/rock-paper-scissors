# Rock-Paper-Scissors App
This repository contains both backend and frontend as well as additional tools 
required for starting a local deployment of a rock-paper-scissors game.

## Getting started

The repository contains the following components:

__Angular-Workspace:__ Inside the [frontend](frontend) folder you can find the frontend's angular workspace

__Spring-Boot Backend:__ The folder [backend](backend) contains the java module with the SpringBootApplication as well as backend business logic

__Docker-Compose Configuration:__ The folder [docker-compose](docker-compose) contains configuration for deploying the above apps using docker-compose, adding monitoring with grafana and prometheus as well as a reverse proxy.

__Tools:__ [tools](tools) contains a script for building the frontend app as an image

## Building the application

### Backend
You can build the backend application using java-17 and maven (a maven wrapper is also provided)
by calling __mvn clean install__ from the project root.
For building the app as a local image, supply the docker profile like so: __mvn clean install -Pdocker__.
In case you will not be running the image on an arm64 processor, override the __rps.base.arch__ property using your settings.xml.

### Frontend
For development purposes, install node (at least version 18) as well as the current angular-cli (__npm install -g @angular/cli__).
Then, after running npm install in the frontend folder, you can use the usual angular commands for programming (e.g., ng serve).
For running the frontend as a local image, from the workspace root, call the script: __tools/build-fe.sh__.
This command will both build the app as well as package it into a nginx base image, so no prerequisites apart from docker are required.

## Running the application

After having built both apps as an image, you can deploy the whole rps application using docker-compose by calling __docker-compose up -d__ from the docker-compose folder.
Apart from the backend and frontend, this process will pull images for grafana and prometheus for metrics as well as traefik for reverse-proxying traffic.
As this deployment is only meant for development purposes, the http traffic is not secured and all admin routes can be accessed without credentials (except grafana, which uses admin/admin by default).

Accessible routes (using port 80 if not otherwise indicated):

1. localhost Entrypoint for the actual app
2. localhost/api/swagger-ui.html Entrypoint for swagger/open-ai docs
3. prom.localhost Prometheus admin-panel
4. grafana.localhost Grafana admin panel (use admin/admin when asked for creds)
5. localhost:8080 Traefik admin panel







