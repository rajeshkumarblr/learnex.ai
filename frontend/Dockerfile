FROM node:18-alpine

# Create user
RUN addgroup -S vscode && adduser -S vscode -G vscode

# Create and set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Set permissions
RUN chown -R vscode:vscode /app

# Switch to non-root user
USER vscode

EXPOSE 3000

CMD ["npm", "run", "dev"]