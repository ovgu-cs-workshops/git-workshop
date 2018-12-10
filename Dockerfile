FROM node:11 as builder

WORKDIR /
RUN git clone https://github.com/ovgu-cs-workshops/git-workshop.git git-workshop
WORKDIR git-workshop

RUN npm ci
RUN ng build --prod

FROM nginx:latest

ARG configuration=production
COPY --from=builder /git-workshop/dist/ /usr/share/nginx/html
