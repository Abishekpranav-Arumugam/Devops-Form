# Use Nginx to serve static files
FROM nginx:latest

# Copy project files into the Nginx HTML folder
COPY public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
