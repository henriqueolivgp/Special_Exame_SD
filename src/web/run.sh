#!/bin/bash
set -e

npm install

if [ "$USE_DEV_MODE" = "true" ]; then
  # Modo desenvolvimento: hot-reload via webpack-dev-server
  npm run start
else
  # Modo produção: build otimizado, servido como ficheiros estáticos
  npm run build
  npx serve -s build -l "${PORT:-3000}"
fi
