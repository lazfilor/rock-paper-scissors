#!/bin/sh
set -x

FRONTEND_FOLDER="${RPS_FOLDER:-$PWD}/frontend"

cd $FRONTEND_FOLDER

docker build -t filor.com/rps-frontend .