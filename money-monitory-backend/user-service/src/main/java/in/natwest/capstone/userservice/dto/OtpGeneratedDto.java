package in.natwest.capstone.userservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpGeneratedDto {
    private String sessionID;
    private String message;
    private Integer code;
}
