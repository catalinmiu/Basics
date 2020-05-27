package com.basics.backend.controller;

import com.basics.backend.dto.RoleDto;
import com.basics.backend.dto.UserDto;
import com.basics.backend.exception.DuplicateUserException;
import com.basics.backend.exception.UserNotFoundException;
import com.basics.backend.model.Role;
import com.basics.backend.model.User;
import com.basics.backend.service.RoleService;
import com.basics.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserService userService;

    private RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<User>> findAllUsers() {
        List<User> allUsers = userService.findAll();
        return ResponseEntity.ok(allUsers);
    }

    @PostMapping
    public ResponseEntity<User> addUser(@Valid @RequestBody UserDto userDto) {
        Optional<User> foundUser = userService.findByEmail(userDto.getEmail());
        if (foundUser.isPresent()) {
            throw new DuplicateUserException(userDto.getEmail() + " There already is an account created for this email address!");
        }

        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setReviews(new ArrayList<>());
        Optional<Role> role = roleService.findById(2L);
        List<Role> roleList = new ArrayList<>();
        role.ifPresent(roleList::add);
        user.setRoles(roleList);
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

    @GetMapping("/getRole/{email}")
    public ResponseEntity<RoleDto> getUserRole(@PathVariable String email){
        List<Role> userRole = userService.findUserRole(email);

        RoleDto roleDto = new RoleDto();

        List<String> roles = new ArrayList<>();

        for(Role role: userRole) {
            roles.add(role.getTitle());
        }
        roleDto.setRoles(roles);

        return ResponseEntity.ok(roleDto);
    }


}

