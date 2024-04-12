package in.natwest.capstone.userservice.config;

public interface JwtTokenGenerator {
    public  String generateToken(String userId) ;
}
