### Usage

# docker build -t pjo/all-notes .
# docker run pjo/all-notes
# docker exec -it <container id> /bin/bash

# TODO check othe versions like alpine, jessie, nuster-slim
# TODO https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# TODO http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# TODO https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# TODO check if node_modules are not copied
# TODO Add more files to dockerignore
# TODO NODE_ENV=production npm start

# WARNING! Your password will be stored unencrypted in /home/dyskovsky/.docker/config.json.
# Configure a credential helper to remove this warning. See
# https://docs.docker.com/engine/reference/commandline/login/#credentials-store

# Cannot use npm ci --only=production because it requires package.lock.json file
# that file leads to fail installaction because of .tgz file (api package)

FROM node:10.15.3
LABEL maintainer="piod94@gmail.com"


WORKDIR /usr/src/app

### Build Api

# only copy the package.json file. This allows us to take advantage of cached Docker layers.
COPY ./api/package*.json ./api/
RUN cd ./api/ && npm install
COPY ./api/ ./api/
RUN cd ./api/ && npm run build
RUN cd ./api && npm pack
# remove source code


### Build Frontend

COPY ./fe-all-notes/package.json ./fe-all-notes/
RUN cd ./fe-all-notes && npm install
COPY ./fe-all-notes/ ./fe-all-notes/
RUN cd ./fe-all-notes && npm run build
# remove source code


### Build Backend

COPY ./be-all-notes/package.json ./be-all-notes/
RUN cd ./be-all-notes/ && npm install
COPY ./be-all-notes/ ./be-all-notes/
RUN cd ./be-all-notes && npm run build
# remove source code


### Configuration

USER node

# Expose is NOT supported by Heroku
EXPOSE 3000

CMD [ "node", "be-all-notes/dist/main.js" ]
