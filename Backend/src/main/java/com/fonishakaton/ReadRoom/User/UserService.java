package com.fonishakaton.ReadRoom.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String email, String rawPassword) {
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(rawPassword)); // hash here
        return userRepository.save(user);
    }

    public boolean authenticate(String email, String rawPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) return false;
        return passwordEncoder.matches(rawPassword, user.getPasswordHash());
    }
}
