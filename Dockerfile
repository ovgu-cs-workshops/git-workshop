FROM node:16-alpine as builder

WORKDIR /git-workshop
ADD package.json .
ADD package-lock.json .
RUN npm ci
ADD . .
RUN npx ng build --prod
RUN ls dist

FROM nginx:1.21-alpine

COPY --from=builder /git-workshop/dist /usr/share/nginx/html

RUN ls /usr/share/nginx/html

ADD ./docker/start.sh /usr/bin
RUN chmod +x /usr/bin/start.sh

CMD ["/usr/bin/start.sh"]
