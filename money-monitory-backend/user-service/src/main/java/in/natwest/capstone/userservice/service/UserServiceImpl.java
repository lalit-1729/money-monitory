package in.natwest.capstone.userservice.service;

import in.natwest.capstone.userservice.config.JwtTokenGenerator;
import in.natwest.capstone.userservice.constants.OtpPurpose;
import in.natwest.capstone.userservice.dto.CustomMessageDto;
import in.natwest.capstone.userservice.dto.OtpGeneratedDto;
import in.natwest.capstone.userservice.dto.UserRegistrationDto;
import in.natwest.capstone.userservice.exceptions.*;
import in.natwest.capstone.userservice.models.GoogleUserProfile;
import in.natwest.capstone.userservice.models.User;
import in.natwest.capstone.userservice.repository.UserRepository;
import in.natwest.capstone.userservice.service.verificationService.VerificationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService {

    private final WebClient webClient;
    @Value("${auth.url}")
    private String userProfileUrl;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenGenerator jwtTokenGenerator;
    @Autowired
    private VerificationService verificationService;

    public UserServiceImpl() {
        webClient = WebClient.builder().baseUrl("https://www.googleapis.com/").build();
    }

    @Override
    public GoogleUserProfile getGoogleUserProfile(String token) throws Exception {
        final GoogleUserProfile userProfile = getUserProfile(token);
        Optional<User> userOptional = userRepository.findByEmail(userProfile.getEmail());
        if (userOptional.isPresent()) {
            throw new UserAlreadyExistsException("User with email Id " + userProfile.getEmail() + " already exists");
        } else if (Boolean.FALSE.equals(userProfile.getEmailVerified())) {
            throw new Exception("Email id not verified with google");
        }
        return userProfile;
    }

    private GoogleUserProfile getUserProfile(String token) {
        Mono<GoogleUserProfile> googleUserProfileMono = webClient.post().uri(userProfileUrl).header("Authorization", "Bearer " + token).retrieve().onStatus(HttpStatusCode::is4xxClientError, this::handleError).onStatus(HttpStatusCode::is5xxServerError, this::handleError).bodyToMono(GoogleUserProfile.class);
        return googleUserProfileMono.block();
    }

    @Override
    public OtpGeneratedDto generateEmailOtp(String emailId, OtpPurpose purpose) throws MessagingException, UserNotFoundException, UserAlreadyExistsException, InvalidFieldException {

        if (validateEmailId(emailId)) {
            throw new InvalidFieldException("Invalid Email Id");
        }
        Optional<User> userOptional = userRepository.findByEmail(emailId);
        if (userOptional.isEmpty() && purpose == OtpPurpose.Login) throw new UserNotFoundException("User not found");
        else if (userOptional.isPresent() && purpose == OtpPurpose.Register) {
            throw new UserAlreadyExistsException("User already exists");
        }

        String sessionId = verificationService.generateEmailOtp(emailId);
        return new OtpGeneratedDto(sessionId, "Otp sent", 1);
    }

    @Override
    public Map verifyEmailOtp(String otp, String sessionId, OtpPurpose purpose) throws UserNotFoundException {
        CustomMessageDto customMessageDto = verificationService.verifyEmailOtp(otp, sessionId);
        if (purpose == OtpPurpose.Register) return customMessageDto.toMap();
        else {
            if (customMessageDto.getCode() != 1) {
                return customMessageDto.toMap();
            } else {
                Optional<User> user = userRepository.findByEmail(customMessageDto.getField());
                if (user.isEmpty()) {
                    throw new UserNotFoundException("User not found");
                }
                String id = user.get().getId();
                String name = user.get().getFirstName() + user.get().getLastName();
                String token = jwtTokenGenerator.generateToken(id);
                return Map.of("authToken", token, "message", "Verified Email successfully", "code", 1, "name", name);
            }
        }
    }

    @Override
    public OtpGeneratedDto generatePhoneNumberOtp(String phoneNo, OtpPurpose purpose, String channel) throws InvalidFieldException, UserNotFoundException, UserAlreadyExistsException {
        if (!validatePhoneNumber(phoneNo)) {
            throw new InvalidFieldException("Phone Number is invalid");
        } else if (!channel.equals("sms") && !channel.equals("whatsapp")) {
            return new OtpGeneratedDto(null, "Invalid channel Id", 0);
        }

        Optional<User> userOptional = userRepository.findByPhoneNumber(phoneNo);
        if (userOptional.isEmpty() && purpose == OtpPurpose.Login) throw new UserNotFoundException("User not found");
        else if (userOptional.isPresent() && purpose == OtpPurpose.Register)
            throw new UserAlreadyExistsException("User already exists");
        final String status = verificationService.generatePhoneOtp(phoneNo, channel);
        return new OtpGeneratedDto(status, "Otp sent", 1);
    }

    @Override
    public Map verifyPhoneNumberOtp(String otp, String phoneNo, OtpPurpose purpose) throws UserNotFoundException, InvalidFieldException {
        if (!validatePhoneNumber(phoneNo)) {
            throw new InvalidFieldException("Phone Number is invalid");
        }
        final CustomMessageDto customMessageDto = verificationService.verifyPhoneOtp(otp, phoneNo);

        if (purpose == OtpPurpose.Transaction) return customMessageDto.toMap();

        if (purpose == OtpPurpose.Register) return customMessageDto.toMap();
        else {
            if (customMessageDto.getCode() != 1) {
                return customMessageDto.toMap();
            } else {
                Optional<User> userOptional = userRepository.findByPhoneNumber(phoneNo);
                if (userOptional.isEmpty()) {
                    throw new UserNotFoundException("User not found");
                }
                User user = userOptional.get();
                user.setLastLogin(LocalDateTime.now());
                userRepository.save(user);
                String id = user.getId();
                String token = jwtTokenGenerator.generateToken(id);
                return Map.of("authToken", token, "message", "Verified Phone number Successfully", "code", 1);
            }
        }
    }

    @Override
    public HashMap<String, String> loginWithGoogle(String token) throws UserNotFoundException, CustomException {
        final GoogleUserProfile googleUserProfile = getUserProfile(token);
        if (googleUserProfile == null) {
            throw new CustomException("Unable to login using Google");
        }
        Optional<User> userOptional = userRepository.findByEmail(googleUserProfile.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String id = user.getId();
            String name = user.getFirstName() + user.getLastName();
            String jwtToken = jwtTokenGenerator.generateToken(id);
            HashMap<String, String> responseMap = new HashMap<>();
            responseMap.putIfAbsent("authToken", jwtToken);
            responseMap.putIfAbsent("code", "1");
            responseMap.putIfAbsent("message", "Successfully logged in");
            responseMap.putIfAbsent("name", name);
            return responseMap;
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

    @Override
    public CustomMessageDto registerUser(UserRegistrationDto userDetails) throws UserAlreadyExistsException, InvalidFieldException {
        System.out.println(userDetails.toString());
        if(validateEmailId(userDetails.getEmail())){
            throw new InvalidFieldException("Email is invalid");
        }else if(!validatePhoneNumber(userDetails.getPhone())){
            throw new InvalidFieldException("Phone Number is invalid");
        }
        Optional<User> userOptionalByEmail = userRepository.findByEmail(userDetails.getEmail());
        Optional<User> userOptionalByPhoneNumber = userRepository.findByPhoneNumber(userDetails.getPhone());

        if (userOptionalByEmail.isPresent()) {
            throw new UserAlreadyExistsException("User with email id " + userDetails.getEmail() + " already exists");
        } else if (userOptionalByPhoneNumber.isPresent()) {
            throw new UserAlreadyExistsException("User with phone number " + userDetails.getPhone() + " already exists.");
        } else {
            final User newUser = new User();
            newUser.setEmail(userDetails.getEmail());
            newUser.setRegisteredOn(LocalDateTime.now());
            newUser.setFirstName(userDetails.getFirstName());
            newUser.setLastName(userDetails.getLastName());
            newUser.setPhoneNumber(userDetails.getPhone());
            userRepository.save(newUser);
            return new CustomMessageDto("Successfully Registered", 1);
        }
    }

    private Mono<? extends Throwable> handleError(ClientResponse clientResponse) {
        HttpStatusCode httpStatusCode = clientResponse.statusCode();
        Mono<String> errorBody = clientResponse.bodyToMono(String.class);
        return errorBody.flatMap(msg -> {
            throw new CustomWebClientException("This is msg ::" + msg + "The status code is " + httpStatusCode.value());
        });
    }


    public boolean validatePhoneNumber(String phoneNumber) {
        Pattern phoneNumberPattern = Pattern.compile("^\\d*$");
        return phoneNumberPattern.matcher(phoneNumber).matches() && phoneNumber.length() >= 10;
    }

    public boolean validateEmailId(String email) {
        String emailRegex = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$";
        return !Pattern.compile(emailRegex, Pattern.CASE_INSENSITIVE).matcher(email).matches();
    }
}
