package com.filor.rps.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Slf4j
@Configuration
@ConditionalOnProperty(name = "rps.dev.mode", havingValue = "true")
public class RpsDevelopmentCorsConfiguration implements WebFluxConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        log.info("Allowing access from local angular app");
        registry.addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins("*");
    }
}
