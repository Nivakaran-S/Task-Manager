# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# Make sure the wrapper is executable
RUN chmod +x ./mvnw
COPY src ./src
# Build the application
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
