package in.natwest.capstone.userservice.service.verificationService;

import in.natwest.capstone.userservice.dto.CustomMessageDto;
import jakarta.mail.MessagingException;

public interface VerificationService {

    public String generateEmailOtp(String email) throws MessagingException;
    public String generatePhoneOtp(String phoneNo, String channel);

    public CustomMessageDto verifyEmailOtp(String otp, String sessionId);

    public CustomMessageDto verifyPhoneOtp(String otp, String phone );
}
