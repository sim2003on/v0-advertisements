# Dockerfile Next.js-ի համար
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN apk add --no-cache bun && bun install
COPY . .  
RUN bun run build  

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
RUN apk add --no-cache bun && bun install --production
EXPOSE 3000
ENV NEXT_PUBLIC_API_URL=http://localhost:9081
CMD ["bun", "start"]
