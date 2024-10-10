FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY index.html xadrez.html ./

COPY css/ ./css/

COPY js/ ./js/

COPY img/ ./img/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
