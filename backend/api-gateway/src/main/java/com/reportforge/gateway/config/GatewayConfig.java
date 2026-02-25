package com.reportforge.gateway.config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

/**
 * Global gateway configuration.
 * Provides key resolvers for rate limiting and any custom global filters.
 */
@Configuration
public class GatewayConfig {

    /**
     * Rate limit key resolver based on remote IP address.
     * Used by the RequestRateLimiter filter to identify unique clients.
     */
    @Bean
    public KeyResolver ipKeyResolver() {
        return exchange -> Mono.just(
                exchange.getRequest().getRemoteAddress() != null
                        ? exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
                        : "unknown");
    }
}
