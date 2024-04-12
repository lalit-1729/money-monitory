package com.stackroute.SendEmailService.Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import static org.mockito.ArgumentMatchers.eq;

public class EmailSenderServiceTest {
    @Mock
    private JavaMailSender mailSender;

    private EmailSenderService emailSenderService;

    @BeforeEach
    void setUp() {
        mailSender = Mockito.mock(JavaMailSender.class);
        emailSenderService = new EmailSenderService();
        ReflectionTestUtils.setField(emailSenderService, "mailSender", mailSender);
    }

    @Test
    void testSendSimpleEmail() {
        // Arrange
        String toEmail = "recipient@example.com";
        String body = "Hello, this is a test email.";
        String subject = "Test Email";

        // Create a SimpleMailMessage object and use it to check if the send method is called
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("PennyBank");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        // Act
        emailSenderService.sendSimpleEmail(toEmail, body, subject);

        // Assert
        Mockito.verify(mailSender).send(eq(message));
    }
}
