# Use the official Node.js 14 image as a parent image
FROM node:14 AS build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --only=development

# Copy the rest of the app source code to the container
COPY . .

# Build the app
RUN npm run build

# Use the official Node.js 14 image as a parent image
FROM node:14-alpine AS production

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Copy the built app from the previous build stage
COPY --from=build /app/dist ./dist

# Set the environment variables for the app
ENV NODE_ENV production
ENV PORT 5000

# Expose the port that the app will run on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]


