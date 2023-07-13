FROM node:20-bookworm as build-stage
RUN npm install -g @angular/cli@16
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN ng build --configuration production

FROM nginx:1.25-alpine
LABEL maintainer="Lazare Filor"
COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=build-stage /usr/src/app/dist/frontend /usr/share/nginx/html
