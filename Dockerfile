# Build stage
FROM oven/bun:1.2.23 AS base
WORKDIR /app

FROM base AS install
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS prerelease
WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM node:22-alpine AS release
WORKDIR /app

COPY --from=prerelease /app/.output /app/.output

ENV PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
