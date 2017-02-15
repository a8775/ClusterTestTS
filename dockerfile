FROM node:latest
MAINTAINER a8775@noreplay.users.github.com

# working directory
RUN mkdir /test-cluster-ts
WORKDIR /test-cluster-ts

# copy files
COPY ./dist ./package.json ./yarn.lock /test-cluster-ts/
RUN npm install yarn -g

RUN yarn

CMD ["-c"]
