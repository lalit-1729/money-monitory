package in.natwest.capstone.userservice.service;

import in.natwest.capstone.userservice.constants.OtpPurpose;
import in.natwest.capstone.userservice.dto.CustomMessageDto;
import in.natwest.capstone.userservice.dto.OtpGeneratedDto;
import in.natwest.capstone.userservice.dto.UserRegistrationDto;
import in.natwest.capstone.userservice.exceptions.CustomException;
import in.natwest.capstone.userservice.exceptions.InvalidFieldException;
import in.natwest.capstone.userservice.exceptions.UserAlreadyExistsException;
import in.natwest.capstone.userservice.exceptions.UserNotFoundException;
import in.natwest.capstone.userservice.models.GoogleUserProfile;
import jakarta.mail.MessagingException;

import java.util.HashMap;
import java.util.Map;

public interface UserService {
    GoogleUserProfile getGoogleUserProfile(String token) throws Exception;
    OtpGeneratedDto generateEmailOtp(String emailId, OtpPurpose purpose) throws MessagingException, UserNotFoundException, UserAlreadyExistsException, InvalidFieldException;
    Map verifyEmailOtp(String otp, String phone, OtpPurpose purpose) throws UserNotFoundException;
    OtpGeneratedDto generatePhoneNumberOtp(String phoneNo, OtpPurpose purpose, String channel) throws InvalidFieldException, UserNotFoundException, UserAlreadyExistsException;
    Map verifyPhoneNumberOtp(String otp, String sessionId, OtpPurpose purpose) throws UserNotFoundException, InvalidFieldException;
    HashMap<String, String>  loginWithGoogle(String token) throws UserNotFoundException, CustomException;

    CustomMessageDto registerUser(UserRegistrationDto userDetails) throws UserAlreadyExistsException, InvalidFieldException;
}
