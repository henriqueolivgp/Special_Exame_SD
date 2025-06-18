#!/bin/bash

npm install;

npx prisma generate;
npx prisma migrate dev;


if [ "$USE_DEV_MODE" = "true" ];
  then npm run start:dev;
  else npm run start;
fi