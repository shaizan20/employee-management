# ═══════════════════════════════════════════════
#  Employee Management System - Dockerfile
# ═══════════════════════════════════════════════

# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for Docker layer caching)
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application source code
COPY backend/ ./backend/
COPY frontend/ ./frontend/
COPY database/ ./database/

# Expose application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application
CMD ["node", "backend/server.js"]
