# use if below doesn't work

# FROM node:22-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# ARG VITE_APP_ENV
# RUN VITE_APP_ENV=$VITE_APP_ENV npm run build
# EXPOSE 3000
# CMD ["npx", "http-server", "dist", "-p", "3000"]

#####################################################

# Use an official Node runtime as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Pass through the docker arg
ARG VITE_APP_ENV

# Use in the build, this switches it to /api for the enpoint for the backend
RUN VITE_APP_ENV=$VITE_APP_ENV npm run build

# Install 'serve' to serve the build output
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "3000"]
