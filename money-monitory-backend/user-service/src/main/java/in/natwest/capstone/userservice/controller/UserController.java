package in.natwest.capstone.userservice.controller;

import in.natwest.capstone.userservice.constants.OtpPurpose;
import in.natwest.capstone.userservice.dto.OtpGeneratedDto;
import in.natwest.capstone.userservice.dto.UserRegistrationDto;
import in.natwest.capstone.userservice.exceptions.CustomException;
import in.natwest.capstone.userservice.exceptions.InvalidFieldException;
import in.natwest.capstone.userservice.exceptions.UserAlreadyExistsException;
import in.natwest.capstone.userservice.exceptions.UserNotFoundException;
import in.natwest.capstone.userservice.models.GoogleUserProfile;
import in.natwest.capstone.userservice.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/v1/users/")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("googleProfile")
    public ResponseEntity<GoogleUserProfile> getGoogleUserProfile(@RequestHeader("accessToken") String accessToken) throws Exception {
        GoogleUserProfile googleUserProfile = userService.getGoogleUserProfile(accessToken);
        return new ResponseEntity<>(googleUserProfile, HttpStatus.OK);
    }

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto userRegistrationDto) throws UserAlreadyExistsException, InvalidFieldException {
        return new ResponseEntity<>(userService.registerUser(userRegistrationDto), HttpStatus.CREATED);
    }

    @PostMapping("getEmailOtp")
    public  ResponseEntity<?> getEmailOtp(@RequestHeader("X-EMAIL") String email, @RequestHeader("X-PURPOSE") OtpPurpose purpose) throws MessagingException, UserNotFoundException, UserAlreadyExistsException, InvalidFieldException {
        final OtpGeneratedDto otpGeneratedDto = userService.generateEmailOtp(email, purpose);
        return new ResponseEntity<>(otpGeneratedDto, HttpStatus.OK);
    }

    @PostMapping("verifyEmailOtp")
    public ResponseEntity<?> verifyEmailOtp(@RequestHeader("X-OTP") String otp, @RequestHeader("X-SESSION-ID") String sessionId,  @RequestHeader("X-PURPOSE") OtpPurpose purpose) throws UserNotFoundException {
        final Map response = userService.verifyEmailOtp(otp, sessionId, purpose);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("getPhoneOtp")
    public ResponseEntity<?> generatePhoneOtp(@RequestHeader("X-PHONE") String phone, @RequestHeader("X-CHANNEL") String channel, @RequestHeader("X-PURPOSE") OtpPurpose purpose) throws UserNotFoundException, UserAlreadyExistsException, InvalidFieldException {
        OtpGeneratedDto otpGeneratedDto = userService.generatePhoneNumberOtp(phone, purpose, channel);
        return new ResponseEntity<>(otpGeneratedDto, HttpStatus.OK);
    }

    @PostMapping("verifyPhoneOtp")
    public ResponseEntity<?> verifyPhoneOtp(@RequestHeader("X-OTP") String otp, @RequestHeader("X-PHONE") String phone, @RequestHeader("X-PURPOSE") OtpPurpose purpose) throws UserNotFoundException, InvalidFieldException {
        final Map response = userService.verifyPhoneNumberOtp(otp, phone, purpose);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("dummy")
    public ResponseEntity<?> getDummyResponse(){
        return ResponseEntity.status(HttpStatus.OK).body("This is response from user controller");
    }
    @PostMapping("googleLogin")
    public  ResponseEntity<?> googleLogin(@RequestHeader("X-TOKEN") String accessToken) throws UserNotFoundException, CustomException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.loginWithGoogle(accessToken));
    }
}
