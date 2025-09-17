FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install bun
RUN npm install -g bun

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
