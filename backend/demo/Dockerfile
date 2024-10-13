# Use a base image that contains JDK (Java Development Kit)
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file from the target directory to the container
COPY target/messdeck-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your application runs on (default for Spring Boot is 8080)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
