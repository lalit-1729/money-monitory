FROM openjdk:17.0.2-oracle
WORKDIR /project/app
COPY ./target/discovery-service-0.0.1-SNAPSHOT.jar discoveryservice.jar
EXPOSE 8000
ENTRYPOINT ["java","-jar","discoveryservice.jar"]

# docker build -t discoveryservice:1.0 .