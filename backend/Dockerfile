# --- STAGE 1: Dependency Installation (Builder Stage) ---
# Use a Node.js base image (20-alpine is lightweight and secure)
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy dependency definition files (package.json and lock file)
COPY package.json package-lock.json ./

# Install only production dependencies (excluding dev dependencies)
# This keeps the final image smaller and more secure
RUN npm install --omit=dev

# --- STAGE 2: Production Image ---
# Use the same lightweight base image for the final production container
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the essential node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the rest of the application code into the container.
# This includes index.js, models/, utilities/, and the .env file.
# Note on .env: For security in production, it's better to manage secrets
# using Docker secrets or environment variables rather than copying the .env file directly.
COPY . .

# Expose the port the app is listening on.
# Your index.js defaults to 8000.
EXPOSE 8000

# Set the environment variable PORT in case the process accesses it directly
ENV PORT=8000

# Define the command to start the application
CMD ["node", "index.js"]