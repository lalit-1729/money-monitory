package com.stackroute.SendEmailService;

import com.stackroute.SendEmailService.Model.Savings;
import com.stackroute.SendEmailService.Service.EmailSenderService;
import com.stackroute.SendEmailService.Service.SavingsAccountsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class EmailSchedulerTest {

    @Mock
    private SavingsAccountsService savingsAccountsService;

    @Mock
    private EmailSenderService emailSenderService;

    private EmailScheduler emailScheduler;

    @BeforeEach
    void setUp() {
        savingsAccountsService = Mockito.mock(SavingsAccountsService.class);
        emailSenderService = Mockito.mock(EmailSenderService.class);
        emailScheduler = new EmailScheduler();

        ReflectionTestUtils.setField(emailScheduler, "savingsAccountsService", savingsAccountsService);
        ReflectionTestUtils.setField(emailScheduler, "service", emailSenderService);
    }

    @Test
    void testTriggerMail() {
        // Arrange
       Savings savings1 = new Savings(1, 12345, "John", "Doe", Arrays.asList(789L, 456L), "john.doe@example.com", 1000.0);
        Savings savings2 = new Savings(2, 67890, "Alice", "Smith", Arrays.asList(321L, 654L), "alice.smith@example.com", 1500.0);
        List<Savings> expectedSavingsList = Arrays.asList(savings1, savings2);

        // Define the behavior of the mock SavingsAccountsService
        when(savingsAccountsService.getAllSavingsAccount()).thenReturn(expectedSavingsList);

        // Act
        emailScheduler.triggerMail();

        // Assert
        // Verify that the emailSenderService.sendSimpleEmail method is called for each user
        verify(emailSenderService, times(2)).sendSimpleEmail(anyString(), anyString(), anyString());
    }

    @Test
    void testGenerateEmailBody() {
        // Arrange
        Savings user = new Savings(1, 12345, "John", "Doe", Arrays.asList(789L, 456L), "john.doe@example.com", 1000.0);

        // Act
        String emailBody = emailScheduler.generateEmailBody(user);

        // Assert
        String expectedEmailBody = "Dear JohnDoe,\n\n" +
                "Here's your savings till this week: £1000.0\n\n" +
                "Keep up the good work on your savings journey! If you have any questions or need assistance, please feel free to reach out to our support team .\n\n" +
                "Best regards,\n" +
                "PennyBank";
        assertEquals(expectedEmailBody, emailBody);
    }
}
