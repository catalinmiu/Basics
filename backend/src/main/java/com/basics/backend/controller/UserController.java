package com.basics.backend.controller;

import com.basics.backend.exception.DuplicateUserException;
import com.basics.backend.exception.UserNotFoundException;
import com.basics.backend.model.User;
import com.basics.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(@Valid @RequestBody User user) {
        Optional<User> foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser.isPresent()) {
            throw new DuplicateUserException(user.getEmail() + " There already is an account created for this email address!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @GetMapping("/{id}")
    public Optional<User> findUserById(@PathVariable Long id) {
        Optional<User> foundUser = userRepository.findById(id);
        if (! foundUser.isPresent()) {
            throw new UserNotFoundException("User whith id : " + id + " not found!");
        }
        return foundUser;
    }

    @DeleteMapping("/{id}")
    public Optional<User> deleteUserById(@PathVariable Long id) {
        Optional<User> foundUser = userRepository.findById(id);
        if (! foundUser.isPresent()) {
            throw new UserNotFoundException("User whith id : " + id + " not found!");
        }
        userRepository.deleteById(id);
        return foundUser;
    }


}

