# 1. Use official Node.js image
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package.json pnpm-lock.yaml* ./

# 4. Install pnpm globally
RUN npm install -g pnpm

# 5. Install dependencies
RUN pnpm install --frozen-lockfile

# 6. Copy rest of the app
COPY . .

# 7. Build Next.js app
RUN pnpm build

# ---- Production image ----
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Next.js needs a user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /usr/local/lib/node_modules/pnpm /usr/local/lib/node_modules/pnpm

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
