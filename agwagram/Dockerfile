# Use an official Node.js runtime as a parent image
FROM node:20

# Create root directory for the website
RUN mkdir /agwagram

# Set the working directory to the newly created directory
WORKDIR /agwagram

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy all files from the current directory to the working directory
COPY . .

# Define environment variable
# ENV NODE_ENV=production

# Run npm start when the container launches
CMD ["npm", "run", "dev"]