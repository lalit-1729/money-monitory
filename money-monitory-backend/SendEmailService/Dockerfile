FROM openjdk:17.0.2-oracle
WORKDIR /project/app
COPY ./target/SendEmailService-0.0.1-SNAPSHOT.jar sendemail.jar
EXPOSE 9010
ENV MYSQL_DB=database
ENV EUREKA_HOST=discoveryservice
ENV MYSQL_HOST=localmysql
ENV MYSQL_ROOT_PASSWORD=password
ENTRYPOINT ["java","-jar","sendemail.jar"]

# docker build -t sendemail:1.0 .
# docker run --name sendemail --network=projectNetwork -p 9011:9010 sendemail:1.0