package com.filor.rps.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "rps.review")
public class ReviewConfigurationProps {

    private Api api = new Api();

    @Data
    public static class Api {

        private String url;

        private String token;
    }
}
