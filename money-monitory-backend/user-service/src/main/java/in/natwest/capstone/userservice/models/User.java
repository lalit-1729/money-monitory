package in.natwest.capstone.userservice.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import in.natwest.capstone.userservice.constants.Gender;
import in.natwest.capstone.userservice.constants.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id")
    @GenericGenerator(
            name = "user_id",
            strategy = "in.natwest.capstone.userservice.config.CustomIdGenerator")
    @Column(name="id", insertable = false, updatable = false, nullable = false)
    private String id;
    @NonNull
    private String firstName;
    @NonNull
    private String lastName;
    @NonNull
    private String email;
    @NonNull
    @JsonProperty("phoneNumber")
    private String phoneNumber;
    private String countryCode;
    private String profileImageUrl;
    private Gender gender;
    private UserStatus status;
    private LocalDateTime registeredOn;
    private LocalDateTime lastLogin;
    private LocalDateTime lastBlockedOn;
    private LocalDateTime dateOfBirth;
    private LocalDateTime lastProfileUpdatedOn;
}