FROM node:16.13.0
RUN mkdir /app
COPY . /app
WORKDIR /app
COPY package.json ./
RUN npm install
CMD ["npm", "start"]

# https://towardsdatascience.com/how-to-dockerize-an-existing-react-application-c27bd8517dcb
# https://www.geeksforgeeks.org/how-to-call-npm-start-though-docker/
# https://learn2torials.com/a/dockerize-reactjs-app