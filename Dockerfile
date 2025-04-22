# version of node to use
FROM node:22
# Directory to save iage
WORKDIR /app
# Install all depedencies to root
COPY package*.json ./
RUN npm install 
# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]
