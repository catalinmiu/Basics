package com.basics.backend.controller;

import com.basics.backend.exception.DuplicateUserException;
import com.basics.backend.exception.UserNotFoundException;
import com.basics.backend.model.User;
import com.basics.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> findAllUsers() {
        return userService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(@Valid @RequestBody User user) {
        Optional<User> foundUser = userService.findByEmail(user.getEmail());
        if (foundUser.isPresent()) {
            throw new DuplicateUserException(user.getEmail() + " There already is an account created for this email address!");
        }
        user.setPassword(user.getPassword());

        return userService.save(user);
    }

    @GetMapping("/{id}")
    public Optional<User> findUserById(@PathVariable Long id) {
        Optional<User> foundUser = userService.findById(id);
        if (! foundUser.isPresent()) {
            throw new UserNotFoundException("User whith id : " + id + " not found!");
        }
        return foundUser;
    }

    @DeleteMapping("/{id}")
    public Optional<User> deleteUserById(@PathVariable Long id) {
        Optional<User> foundUser = userService.findById(id);
        if (! foundUser.isPresent()) {
            throw new UserNotFoundException("User whith id : " + id + " not found!");
        }
        userService.deleteById(id);
        return foundUser;
    }


}

