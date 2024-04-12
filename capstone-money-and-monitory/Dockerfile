FROM node:alpine AS development
ENV NODE_ENV development
WORKDIR /project/react-app
COPY ./package.json /project/react-app
RUN npm install --force
COPY . .
CMD npm start

# Command to build Image
# docker build -t moneyfrontend:1.0 .

# Command to run container:
# docker run --name moneyfrontend --network=projectNetwork -p 3020:3000 moneyfrontend:1.0