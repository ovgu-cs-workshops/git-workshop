FROM node:11 as builder

WORKDIR /
RUN git clone https://github.com/ovgu-cs-workshops/git-workshop.git git-workshop
WORKDIR git-workshop

RUN npm ci
RUN npx ng build --prod
RUN ls dist

FROM nginx:latest

COPY --from=builder /git-workshop/dist /usr/share/nginx/html

ADD ./docker/start.sh /usr/bin
RUN chmod +x /usr/bin/start.sh

CMD ["/usr/bin/start.sh"]
