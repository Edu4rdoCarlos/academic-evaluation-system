FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./
COPY database/package.json ./database/
COPY backend/package.json ./backend/

RUN npm ci

COPY database ./database
COPY backend ./backend

RUN npm run prisma:generate --workspace=@sistema-provas/backend
RUN npm run build --workspace=@sistema-provas/backend

COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 3001

CMD ["./start.sh"]
