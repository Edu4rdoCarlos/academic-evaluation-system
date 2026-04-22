#!/bin/sh
set -e

npm run prisma:migrate --workspace=@sistema-provas/backend
npm run seed --workspace=@sistema-provas/database || true

exec node backend/dist/src/main.js
