FROM node:14

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE ${PORT}

RUN echo "umask o=rwx" >> ~/.bashrc

CMD [ "yarn" "dev" ]