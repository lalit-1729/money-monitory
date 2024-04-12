package in.natwest.capstone.userservice;

import in.natwest.capstone.userservice.models.User;
import in.natwest.capstone.userservice.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    private User user1;
    private User user2;

    @BeforeEach
    public void setUp() {
        user1 = new User();
        user1.setEmail("test1@example.com");
        user1.setPhoneNumber("9746113518");
        user1.setId("PNBK06548977");

        user2 = new User();
        user2.setEmail("test2@example.com");
        user2.setPhoneNumber("9746000000");
        user1.setId("PNBK06548977");


        userRepository.saveAll(List.of(user1, user2));
    }

    @AfterEach
    public void clearTestSample() {
        userRepository.deleteById(user1.getId());
        userRepository.deleteById(user2.getId());
    }

    @Test
    void testFindByEmail() {
        Optional<User> foundUser = userRepository.findByEmail(user1.getEmail());
        assertThat(foundUser).isPresent();
        assertThat(foundUser).contains(user1);
    }

    @Test
    void testFindByPhoneNumber() {
        Optional<User> foundUser = userRepository.findByPhoneNumber(user2.getPhoneNumber());
        assertThat(foundUser).isPresent();
        assertThat(foundUser).contains(user2);
    }

    @Test
    void testSave() {
        User newUser = new User();
        newUser.setEmail("test3@example.com");
        newUser.setPhoneNumber("9879416548");
        userRepository.save(newUser);
        Optional<User> foundUser = userRepository.findByEmail(newUser.getEmail());
        assertThat(foundUser).isPresent();
        assertThat(foundUser).contains(newUser);
        userRepository.delete(newUser);
    }

    @Test
    void testDelete() {
        userRepository.delete(user1);
        Optional<User> foundUser = userRepository.findByEmail(user1.getEmail());
        assertThat(foundUser).isEmpty();
    }
}