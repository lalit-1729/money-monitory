package in.natwest.capstone.authservice.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
@Component
public class JwtFilter implements GatewayFilter {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {


        // Separating Request and Response
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();


        // Checking for authorization token in header
        if (!request.getHeaders().containsKey("Authorization")) {
            System.out.println("1");
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        final String authorizationHeader = request.getHeaders().getOrEmpty("Authorization").get(0);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            System.out.println("2");

            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        final String token = authorizationHeader.substring(7);

        try {
            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            final String userId = claims.getSubject();
            request.mutate().header("X-USER-ID", userId);
        } catch (Exception e) {
            System.out.println(e);
            System.out.println("3");

            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        return chain.filter(exchange);
    }
}
