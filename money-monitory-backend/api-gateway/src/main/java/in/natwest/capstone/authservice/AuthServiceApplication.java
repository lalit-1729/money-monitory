package in.natwest.capstone.authservice;

import in.natwest.capstone.authservice.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@EnableDiscoveryClient
public class AuthServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
	}

	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	public RouteLocator apiRoutes (RouteLocatorBuilder builder){
		return builder.routes()
				.route("user_route",route->route.path("/api/v1/users/**").uri("lb://user-service"))
				.route("Transaction",route->route.path("/api/**").filters(temp->temp.filter(jwtFilter)).uri("lb://Transaction"))
				.route("Account",route->route.path("/api/**").filters(temp->temp.filter(jwtFilter)).uri("lb://Account"))
				.build();
	}

}
