# ---- Stage 1: Build the TypeScript backend ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install ALL deps (including dev for tsx/tsc)
COPY package*.json ./
RUN npm ci

# Copy source
COPY src/agent.ts ./src/agent.ts
COPY tsconfig.json ./tsconfig.json

# ---- Stage 2: Production image ----
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files and install production deps only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source file (we run with tsx at runtime — lightweight, no build step needed)
COPY src/agent.ts ./src/agent.ts

# Cloud Run injects PORT env variable
ENV PORT=8080

# The Gemini API key is injected via Cloud Run secret at runtime
# GEMINI_API_KEY is NOT baked into the image

EXPOSE 8080

CMD ["node", "--loader", "tsx", "src/agent.ts"]
