FROM node:12.18.3 as build
WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . ./

ARG GROUPS_ROOT_URL
ARG NOTES_ROOT_URL
ENV GROUPS_ROOT_URL $GROUPS_ROOT_URL
ENV NOTES_ROOT_URL $NOTES_ROOT_URL

RUN npm run build

FROM node:12.18.3 as run
WORKDIR /app

COPY --from=build /app/package*.json ./
RUN npm install --only=prod
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./

CMD ["npm", "run", "deploy"]
