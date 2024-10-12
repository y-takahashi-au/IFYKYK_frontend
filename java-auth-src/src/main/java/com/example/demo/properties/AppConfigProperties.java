package com.example.demo.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import lombok.Getter;

@Getter
@ConfigurationProperties(prefix = "app.config")
public class AppConfigProperties {
    private String appName;
}
