FROM node:23-alpine
WORKDIR /erp-frontend/app
COPY . /erp-frontend/app

RUN npm install
EXPOSE 3000
CMD ["npm","run","dev"]