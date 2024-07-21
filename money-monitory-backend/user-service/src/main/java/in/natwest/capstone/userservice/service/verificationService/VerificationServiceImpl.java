package in.natwest.capstone.userservice.service.verificationService;

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import in.natwest.capstone.userservice.constants.StringConstants;
import in.natwest.capstone.userservice.dto.CustomMessageDto;
import in.natwest.capstone.userservice.dto.Session;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Random;
import java.util.UUID;

@Service
public class VerificationServiceImpl implements VerificationService {
    @Value("${twilio.sid}")
    private String accountSid;
    @Value("${twilio.token}")
    private String accountToken;
    @Value("${twilio.service.sid}")
    private String serviceSid;
    private final Random random = new Random();
    private final HashMap<String, Session> sessions = new HashMap<>();

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public String generateEmailOtp(String email) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        message.setRecipients(Message.RecipientType.TO, email);

        message.setSubject(StringConstants.emailSubject);
        String otp = String.format("%04d", random.nextInt(10000));

        String htmlContent = String.format(StringConstants.emailTemplate, otp);
        message.setContent(htmlContent, "text/html; charset=utf-8");
        UUID uuid = UUID.randomUUID();

        // Creating current Session
        Session session = new Session();
        session.setOtp( otp);
        session.setTimeOtpRelease(Instant.now().getEpochSecond());
        session.setIsVerified(false);
        session.setEmail(email);

        // Adding the session
        sessions.putIfAbsent(uuid.toString(), session);

        javaMailSender.send(message);
        return uuid.toString();
    }

    @Override
    public String generatePhoneOtp(String phoneNo, String channel) {
        Twilio.init(accountSid, accountToken);
        Verification verification = Verification.creator(serviceSid, "+91"+phoneNo, channel)
                .create();
        return verification.getStatus();
    }

    @Override
    public CustomMessageDto verifyEmailOtp(String otp, String sessionId) {
        if (sessions.get(sessionId) == null) {
            return new CustomMessageDto("Invalid Session Id", 0);
        }

        Session sessionDetails = sessions.get(sessionId);
        Long currentInstant = Instant.now().getEpochSecond();
        Long sessionInstant = sessionDetails.getTimeOtpRelease();

        if (currentInstant - sessionInstant > 300) {
            return new CustomMessageDto("Otp expired", 0);
        } else if (!sessionDetails.getOtp().equals(otp)) {
            return new CustomMessageDto("Invalid Otp", 0);
        } else {
            sessions.remove(sessionId);
            return new CustomMessageDto("Email Verified", 1, sessionDetails.getEmail());
        }
    }

    @Override
    public CustomMessageDto verifyPhoneOtp(String otp, String phoneNo) {
        Twilio.init(accountSid, accountToken);
        VerificationCheck verificationCheck = VerificationCheck.creator(serviceSid)
                .setTo("+91"+phoneNo)
                .setCode(otp)
                .create();
        return new CustomMessageDto(verificationCheck.getStatus(), verificationCheck.getStatus().equalsIgnoreCase("approved") ? 1 :0);
    }
}
