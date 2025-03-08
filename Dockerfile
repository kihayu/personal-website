# Build stage
FROM oven/bun:1.2.4 AS base
WORKDIR /app

FROM base AS install
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS prerelease
WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM base AS release
WORKDIR /app

COPY --from=install /app/node_modules /app/node_modules
COPY --from=prerelease /app/package.json /app/package.json
COPY --from=prerelease /app/.output /app/.output
COPY --from=prerelease /app/nuxt.config.ts /app/nuxt.config.ts

USER bun
EXPOSE 3000/tcp
CMD ["bun", "run", "start"]
