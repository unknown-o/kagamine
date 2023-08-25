FROM node:16
WORKDIR /usr/src/app
ENV WORK_PATH /usr/src/app
COPY . .
RUN yarn config set registry https://registry.npmmirror.com && yarn install && yarn generate
FROM nginx
COPY --from=0 /usr/src/app/dist/ /usr/share/nginx/html/