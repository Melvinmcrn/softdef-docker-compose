FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD 1234
ENV MYSQL_USER melvin
ENV MYSQL_PASSWORD 1234
ENV MYSQL_DATABASE my_db

COPY ./sql-scripts /docker-entrypoint-initdb.d/