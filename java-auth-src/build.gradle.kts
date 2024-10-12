plugins {
    java
    id("org.springframework.boot") version "3.3.4"
    id("io.spring.dependency-management") version "1.1.6"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web:3.3.4")
    implementation("org.springframework.boot:spring-boot-starter-security:3.3.4")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server:3.3.4")
    implementation("org.springframework.security.oauth.boot:spring-security-oauth2-autoconfigure:2.6.8")
    compileOnly("org.projectlombok:lombok:1.18.34")
    annotationProcessor ("org.projectlombok:lombok:1.18.34")
    implementation("com.mysql:mysql-connector-j:9.0.0")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    implementation("org.springframework.security:spring-security-jwt:1.1.1.RELEASE")
    implementation("com.github.f4b6a3:ulid-creator:5.2.3")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc:3.3.4")
    implementation("org.flywaydb:flyway-core:10.19.0")
    implementation("org.flywaydb:flyway-mysql:10.19.0")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.3.4")
    implementation("org.apache.commons:commons-lang3:3.17.0")
    implementation("commons-io:commons-io:2.17.0")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.18.0")
    implementation("com.auth0:java-jwt:4.4.0")
    compileOnly("jakarta.servlet:jakarta.servlet-api:6.1.0")

}

tasks.withType<Test> {
    useJUnitPlatform()
}
