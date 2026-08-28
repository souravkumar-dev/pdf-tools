FROM node:22-bookworm-slim

# Install Ghostscript
RUN apt-get update \
    && apt-get install -y --no-install-recommends ghostscript \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install backend dependencies
COPY server/package*.json ./
RUN npm install --omit=dev

# Copy backend source code
COPY server/ .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "start"]