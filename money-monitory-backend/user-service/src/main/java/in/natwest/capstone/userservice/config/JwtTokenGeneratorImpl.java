package in.natwest.capstone.userservice.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenGeneratorImpl implements JwtTokenGenerator{

    @Value("${jwt.secretKey}")
    private String secretKey;
    @Override
    public String generateToken(String userId) {
        final int expirationDuration = 15*60*1000;
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationDuration))
                .setIssuer("in.natwest.pennybank")
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
