package com.filor.rps.configuration;

import com.filor.rps.services.LocalReviewProvider;
import com.filor.rps.services.RemoteReviewProvider;
import com.filor.rps.services.ReviewProvider;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.composite.CompositeMeterRegistry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;


@Slf4j
@Configuration
@Import({CompositeMeterRegistry.class})
@EnableConfigurationProperties({ReviewConfigurationProps.class})
public class RpsConfiguration {

    public static final String AUTH_TYPE = "Bearer ";

    public static final int OPEN_AI_TIMEOUT = 3000;

    @Bean
    @Lazy
    public WebClient openAiClient(ReviewConfigurationProps configurationProps) {
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(HttpClient.create().responseTimeout(Duration.ofMillis(OPEN_AI_TIMEOUT))))
                .baseUrl(configurationProps.getApi().getUrl())
                .defaultHeader(HttpHeaders.AUTHORIZATION, AUTH_TYPE + configurationProps.getApi().getToken())
                .build();
    }

    @Bean
    @ConditionalOnProperty(name = "rps.review.useLocal", havingValue = "true")
    public ReviewProvider localReviewProvider() {
        log.info("Using {} for providing reviews", LocalReviewProvider.class);
        return new LocalReviewProvider();
    }

    @Bean
    @ConditionalOnMissingBean
    public ReviewProvider remoteReviewProvider(WebClient openAiClient) {
        log.info("Using {} for providing reviews", RemoteReviewProvider.class);
        return new RemoteReviewProvider(openAiClient);
    }
}
