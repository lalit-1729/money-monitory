package in.natwest.capstone.userservice;


import in.natwest.capstone.userservice.constants.OtpPurpose;
import in.natwest.capstone.userservice.exceptions.InvalidFieldException;
import in.natwest.capstone.userservice.exceptions.UserAlreadyExistsException;
import in.natwest.capstone.userservice.exceptions.UserNotFoundException;
import in.natwest.capstone.userservice.models.User;
import in.natwest.capstone.userservice.repository.UserRepository;
import in.natwest.capstone.userservice.service.UserServiceImpl;
import in.natwest.capstone.userservice.service.verificationService.VerificationService;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class UserServiceImplTest {

    @Mock
    private VerificationService verificationService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl service;

    @Test
    @DisplayName("Test generateEmailOtp() with valid email id and purpose as Register")
    void testGenerateEmailOtpWithValidEmailIdAndPurposeAsLogin() throws MessagingException, UserNotFoundException, UserAlreadyExistsException, InvalidFieldException {
        when(verificationService.generateEmailOtp("test@example.com")).thenReturn("123456");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> service.generateEmailOtp("test@example.com", OtpPurpose.Login));
    }


    @Test
    @DisplayName("Test generateEmailOtp() with valid email id and purpose as Register")
    void testGenerateEmailOtpWithValidEmailIdAndPurposeAsRegister() throws MessagingException, UserNotFoundException, UserAlreadyExistsException, InvalidFieldException {
        when(verificationService.generateEmailOtp("test@example.com")).thenReturn("123456");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(User.builder().email("test@example.com").phoneNumber("9874563210").id("PNBK099079").firstName("first").lastName("last").build()));
        assertThrows(UserAlreadyExistsException.class, () -> service.generateEmailOtp("test@example.com", OtpPurpose.Register));
    }

    @Test
    void testAValidPhoneNumber() {
        boolean isValid = service.validatePhoneNumber("9987456987");
        assertTrue(isValid);
    }

    @Test
    void testAnInValidPhoneNumber() {
        boolean isValid = service.validatePhoneNumber("99874KKLOIlnjk");
        assertFalse(isValid);
    }

    @Test
    void testAValidEmail() {
        boolean isNotValid = service.validateEmailId("text@exam.com");
        assertFalse(isNotValid);
    }

    @Test
    void testAnInValidEmail() {
        boolean isNotValid = service.validateEmailId("ihnu##$@089@@.");
        assertTrue(isNotValid);
    }
}
