FROM eclipse-temurin:11
# ARG WAR_FILE=target/*.jar
# COPY ${WAR_FILE} vcp-0.0.1-SNAPSHOT.jar
RUN mkdir /opt/app
COPY target/vcp-0.0.1-SNAPSHOT.jar /opt/app
ENTRYPOINT ["java","-jar","/opt/app/vcp-0.0.1-SNAPSHOT.jar"]