#FROM nginx
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose the port the app runs on
EXPOSE 80