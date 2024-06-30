#!/bin/bash

npm install;

npx prisma generate;

npm run clean



if [ "$USE_DEV_MODE" = "true" ];
  then npm run start:dev;
  else npm run start;
fi