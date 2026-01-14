# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Install Playwright browsers
# RUN npx playwright install --with-deps
RUN apt-get update && apt-get install -y xvfb x11vnc

EXPOSE 5900

CMD xvfb :99 -screen 0 1280x720x24 & \
    x11vnc -display :99 -forever -nopw & \
    DISPLAY=:99 npx cucumber-js

# Expose VNC port
EXPOSE 5900

# Default command
CMD ["npm", "run", "test:headed"]