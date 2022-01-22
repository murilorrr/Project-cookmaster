FROM mongo AS ProjectCookmaster
 WORKDIR /src
 VOLUME ["./src"]
 COPY . ./src
 EXPOSE 27017
 CMD ["npm", "start"]