FROM openjdk:17.0.2-oracle
WORKDIR /project/app
COPY ./target/api-gateway-0.0.1-SNAPSHOT.jar apigateway.jar
EXPOSE 8020
ENV JWT_SECRET=27432a621869814664e0c685c96427f2785d0f984d2697ec95b9818246f6163d
ENV EUREKA_HOST=discoveryservice
ENTRYPOINT ["java","-jar","apigateway.jar"]

# docker build -t apigateway:1.0 .

#  docker run --name apigateway --network=projectNetwork -p 8021:8020 apigateway:1.0