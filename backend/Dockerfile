FROM node:16-alpine
WORKDIR .
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 5000
CMD ["yarn", "dev"]

