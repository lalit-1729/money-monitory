FROM openjdk:17.0.2-oracle
WORKDIR /project/app
COPY ./target/Account-0.0.1-SNAPSHOT.jar account.jar
EXPOSE 8015
ENV MYSQL_DB=database
ENV EUREKA_HOST=discoveryservice
ENV MYSQL_HOST=localmysql
ENV MYSQL_ROOT_PASSWORD=password
ENTRYPOINT ["java","-jar","account.jar"]

# docker build -t account:1.0 .
# docker run --name account --network=projectNetwork -p 8016:8015 account:1.0
