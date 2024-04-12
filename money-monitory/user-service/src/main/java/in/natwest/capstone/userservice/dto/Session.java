package in.natwest.capstone.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Session {
    private String otp;
    private Long timeOtpRelease;
    private Boolean isVerified;
    private String email;
    private String phone;
}
