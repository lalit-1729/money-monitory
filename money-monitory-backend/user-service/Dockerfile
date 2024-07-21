FROM openjdk:17.0.2-oracle
WORKDIR /project/app
COPY ./target/user-service-0.0.1-SNAPSHOT.jar userservice.jar
EXPOSE 8010
ENV MYSQL_DB=database
ENV JWT_SECRET=27432a621869814664e0c685c96427f2785d0f984d2697ec95b9818246f6163d
ENV EUREKA_HOST=discoveryservice
ENV MYSQL_HOST=localmysql
ENV MYSQL_ROOT_PASSWORD=password
ENTRYPOINT ["java","-jar","userservice.jar"]

#Step 1
# mvn package -DskipTests=true

#Step 2
# docker build -t userservice:1.0 .

#Step 3
# docker run --name userservice --network=projectNetwork -p 8011:8010 userservice:1.0