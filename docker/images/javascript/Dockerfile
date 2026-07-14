FROM node:21-alpine3.17

WORKDIR /app

RUN apt-get update && apt-get install -y bash
RUN npm update npm -g
RUN npm install nodemon -g
RUN npm install knex -g

ENTRYPOINT (sed -i 's/\r$//' ./run.sh) ; (chmod +x ./run.sh) ; ./run.sh