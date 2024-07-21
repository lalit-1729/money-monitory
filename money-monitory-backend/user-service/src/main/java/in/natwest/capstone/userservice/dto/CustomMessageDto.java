package in.natwest.capstone.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomMessageDto {
    private String message;
    private Integer code;
    private String field;

    public CustomMessageDto(String message, int code) {
        this.message = message;
        this.code = code;
    }

    public Map<String, Object> toMap(){
        HashMap<String, Object> map = new HashMap<>();
        map.putIfAbsent("message", message);
        map.putIfAbsent("code", code);
        return map;
    }
}
