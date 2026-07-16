FROM node:21-alpine3.17

WORKDIR /app

RUN apk add --no-cache bash
RUN npm install -g nodemon knex

COPY . .

ENTRYPOINT (sed -i 's/\r$//' ./run.sh) ; (chmod +x ./run.sh) ; ./run.sh