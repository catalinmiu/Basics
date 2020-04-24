package com.basics.backend.controller;

import com.basics.backend.exception.DuplicateUserException;
import com.basics.backend.exception.UserNotFoundException;
import com.basics.backend.model.User;
import com.basics.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
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
    public ResponseEntity<List<User>> findAllUsers() {
        List<User> allUsers = userService.findAll();
        return ResponseEntity.ok(allUsers);
    }

    @PostMapping
    public ResponseEntity<User> addUser(@Valid @RequestBody User user) {
        Optional<User> foundUser = userService.findByEmail(user.getEmail());
        if (foundUser.isPresent()) {
            throw new DuplicateUserException(user.getEmail() + " There already is an account created for this email address!");
        }
        user.setPassword(user.getPassword());
        User savedUser = userService.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findUserById(@PathVariable Long id) {
        Optional<User> foundUser = userService.findById(id);
        if (! foundUser.isPresent()) {
            throw new UserNotFoundException("User whith id : " + id + " not found!");
        }
        return ResponseEntity.ok(foundUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<User>> deleteUserById(@PathVariable Long id) {
        Optional<User> foundUser = userService.findById(id);
        if (! foundUser.isPresent()) {
            throw new UserNotFoundException("User whith id : " + id + " not found!");
        }
        userService.deleteById(id);
        return ResponseEntity.ok(foundUser);
    }


}

