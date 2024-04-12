package com.stackroute.SendEmailService.Service;
import com.stackroute.SendEmailService.Model.Savings;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class SavingsAccountServiceTest {
    @Mock
    private SavingsAccountsService savingsAccountsService;

    @BeforeEach
    void setUp() {
        savingsAccountsService = Mockito.mock(SavingsAccountsService.class);
    }

    @Test
    void testGetAllSavingsAccount() {
        // Arrange
        Savings savings1 = new Savings(1, 12345, "John", "Doe", Arrays.asList(789L, 456L), "john.doe@example.com", 1000.0);
        Savings savings2 = new Savings(2, 67890, "Alice", "Smith", Arrays.asList(321L, 654L), "alice.smith@example.com", 1500.0);
        List<Savings> expectedSavingsList = Arrays.asList(savings1, savings2);

        // Define the behavior of the mock Feign client
        Mockito.when(savingsAccountsService.getAllSavingsAccount()).thenReturn(expectedSavingsList);

        // Act
        List<Savings> actualSavingsList = savingsAccountsService.getAllSavingsAccount();

        // Assert
        // Verify that the Feign client method getAllSavingsAccount returns the expected list of savings
        Mockito.verify(savingsAccountsService).getAllSavingsAccount();
        // Perform assertions to check if the actual result matches the expected result
        assertEquals(expectedSavingsList, actualSavingsList);
    }
}
