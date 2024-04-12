package com.natwest.Account.service;

import com.natwest.Account.models.Account;
import com.natwest.Account.repository.AccountRepository;
import com.natwest.Savings.model.Savings;
import com.natwest.Savings.repository.AccountUserRepository;
import com.natwest.Savings.service.AccountUserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
    Account account;
    Savings savings;

    @Mock
    private AccountUserRepository repository;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountUserServiceImpl service;

    @InjectMocks
    private AccountServiceImplementation accountServiceImplementation;

    @BeforeEach
    void setUp() {
        account = new Account(907867889, 134567890, "Melinda", "Monroe", "primary", "mm@gmail,com", 123.78, "Mel Monroe", "456787653456", 456, "12/05/2006");
        savings = new Savings(1234567456,"Thomas","Monroe","tm@gmail.com",67895678,189.56);
    }

    @Test
    public void givenAccountDetailsReturnsSavedAccount(){
        when(accountRepository.save(any(Account.class))).thenReturn(account);

        Account account1 = accountServiceImplementation.addAccount(account);

        assertAll(
                ()->{assertNotNull(account);},
                ()->{assertTrue(account1.getFirstName().equals("Melinda"));},
                ()->{assertTrue(account1.getLastName().equals("Monroe"));}

        );

        verify(accountRepository,times(1)).save(any(Account.class));
        verifyNoMoreInteractions(accountRepository);
    }

    @Test
    public void givenAccountDetailsReturnsSavingsAccount(){

        when(repository.save(any(Savings.class))).thenReturn(savings);

        Savings savings1 = service.createSavingsAcc(savings);

        assertAll(
                ()->{assertNotNull(savings);},
                ()->{assertTrue(savings1.getFirstName().equals("Thomas"));},
                ()->{assertTrue(savings1.getLastName().equals("Monroe"));},
                ()->{assertTrue(savings1.getEmail().equals("tm@gmail.com"));}

        );

        verify(repository,times(1)).save(any(Savings.class));
    }
}
