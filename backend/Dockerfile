FROM node:18-bullseye

# Install system dependencies (Ghostscript and LibreOffice)
RUN apt-get update && apt-get install -y \
    ghostscript \
    libreoffice \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port
EXPOSE 5000

# Start command
CMD [ "node", "index.js" ]
