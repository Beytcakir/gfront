# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that Next.js will run on
EXPOSE 3000

# Define environment variables for Next.js
ENV NEXT_PUBLIC_API_URL=http://localhost:8080

# Start the Next.js app
CMD ["npm", "start"]
