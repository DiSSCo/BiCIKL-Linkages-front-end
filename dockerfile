# Pull official node image as base
FROM node:18.7.0-alpine3.16 as build

# Set working directory
WORKDIR /blue

# Install dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install npm@8.17.0
RUN npm install react-scripts@5.0.1

# Copy application
COPY . ./

# Setting app to production build
RUN npm run build

# Setting up NGINX
FROM nginx:stable-alpine

COPY --from=build /blue/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start application
CMD ["nginx", "-g", "daemon off;"]