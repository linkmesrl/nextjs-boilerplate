FROM node:6-alpine
COPY package.json .

# Required to compile native modules
RUN apk update && apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        git \
        curl \
        openssh-client \
    && npm install --quiet
