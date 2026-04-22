#!/bin/sh
set -e

npm run prisma:migrate --workspace=@sistema-provas/backend
npm run seed --workspace=@sistema-provas/database

exec node backend/dist/main.js
