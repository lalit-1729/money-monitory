package in.natwest.capstone.userservice;

import in.natwest.capstone.userservice.config.JwtTokenGenerator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class JwtGeneratorTest {
    @Value("${jwt.secretKey}")
    private String secretKey;
    @Autowired
    private JwtTokenGenerator jwtTokenGenerator;

    @Test
    void testToCheckIfTokenIsNotNul() {
        String userId = "EWYERHTHG467467";
        String token = jwtTokenGenerator.generateToken(userId);
        assertNotNull(token);
    }

    @Test
    void testToCheckIfEncodedProperlyOrNot() {
        String userId = "123456";
        String token = jwtTokenGenerator.generateToken(userId);
        Claims claimsJws = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        assertEquals(userId, claimsJws.getSubject());
    }
}
