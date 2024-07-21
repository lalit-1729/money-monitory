FROM openjdk:17.0.2-oracle
WORKDIR /project/app
COPY ./target/Transaction-0.0.1-SNAPSHOT.jar transactions.jar
EXPOSE 9000
ENV MYSQL_DB=database
ENV EUREKA_HOST=discoveryservice
ENV MYSQL_HOST=localmysql
ENV MYSQL_ROOT_PASSWORD=password
ENTRYPOINT ["java","-jar","transactions.jar"]

# docker build -t transactions:1.0 .
# docker run --name transactions --network=projectNetwork -p 9001:9000 transactions:1.0
