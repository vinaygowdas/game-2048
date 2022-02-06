# Stage 1
FROM node:12.10.0-alpine AS BUILD_IMAGE
LABEL AUTHOR="VMD (◑.◑)"

# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY . ./
# start app
CMD ["npm", "start"]