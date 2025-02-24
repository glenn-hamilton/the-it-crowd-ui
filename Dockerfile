FROM node:14

WORKDIR /code

ARG BASE_URL
ENV BASE_URL ${BASE_URL}

COPY . /code

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"] 
