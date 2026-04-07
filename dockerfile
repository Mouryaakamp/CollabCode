# create a dist folder in frontend 

#copy the contents of dist folder to the backend public folder 

FROM node:20-alpine AS frontend-builder

COPY ./Frontend /app

WORKDIR /app

RUN npm install

RUN npm run build

#backend setup

FROM node:20-alpine 

COPY ./Backend /app

WORKDIR /app

RUN npm install

COPY --from=frontend-builder /app/dist /app/public

CMD [ "node","server.js" ]



