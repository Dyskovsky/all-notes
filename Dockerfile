### Usage

# docker build -t pjo/all-notes .
# docker run pjo/all-notes
# docker exec -it <container id> /bin/sh

# NOTE https://github.com/docker/docker-bench-security
# GUIDE https://docker-curriculum.com/ (with AWS deploy)

FROM node:10.15.3-alpine
LABEL maintainer="piod94@gmail.com"

# for node-gyp support
# RUN apk add --no-cache --virtual .gyp python make g++ \
#    && npm install [ your npm dependencies here ] \
#    && apk del .gyp

WORKDIR /usr/src/app
COPY ./dto ./dto/
ENV NODE_ENV production


### Build Frontend

COPY ./fe-all-notes/package.json ./fe-all-notes/package-lock.json ./fe-all-notes/
RUN cd ./fe-all-notes && npm ci
COPY ./fe-all-notes/ ./fe-all-notes/
# print files/dirs
RUN cd ./fe-all-notes && ls -A
RUN cd ./fe-all-notes && npm run build


### Build Backend

COPY ./be-all-notes/package.json ./be-all-notes/package-lock.json ./be-all-notes/
RUN cd ./be-all-notes/ && npm ci
COPY ./be-all-notes/ ./be-all-notes/
# print copied files/dirs
RUN cd ./be-all-notes && ls -A
RUN cd ./be-all-notes && npm run build


### Cleaning

RUN rm ./dto -R
RUN rm ./fe-all-notes -R
RUN rm ./be-all-notes/src -R


### Configuration

USER node

# Expose is NOT supported by Heroku
EXPOSE 3000

WORKDIR /usr/src/app/be-all-notes

CMD [ "node", "dist/be-all-notes/src/main.js" ]
