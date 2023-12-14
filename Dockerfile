# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the application code to the container
COPY . .

# Specify the command to run your application
CMD ["node", "index.js"]
