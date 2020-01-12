FROM node:13.5.0

WORKDIR /usr/src/app
COPY . .
RUN npm install --production

EXPOSE 3000
CMD ["node", "index.js"]