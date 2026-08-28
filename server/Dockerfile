FROM node:22-bookworm-slim

# Install Ghostscript
RUN apt-get update \
    && apt-get install -y --no-install-recommends ghostscript \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application
COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "start"]