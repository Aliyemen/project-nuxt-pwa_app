FROM node:16.14.2-alpine

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV HOST 0.0.0.0

ADD package.json ./
ADD nuxt.config.js ./

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/app/

# expose 5000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000


