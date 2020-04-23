package com.basics.backend.controller;

import com.basics.backend.exception.RoleNotFoundException;
import com.basics.backend.model.Role;
import com.basics.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RoleController {

    private RoleRepository roleRepository;
    @Autowired

    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Role> findRoleById(@PathVariable Long id) {
        Optional<Role> foundRole = roleRepository.findById(id);
        if (! foundRole.isPresent()) {
            throw new RoleNotFoundException("Role with id : " + id + " was not found!");
        }

        return foundRole;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Role addRole(@Valid @RequestBody Role role) {
        return roleRepository.save(role);
    }

    @DeleteMapping("/{id}")
    public Optional<Role> deleteRole(@PathVariable Long id) {
        Optional<Role> foundRole = roleRepository.findById(id);
        if (! foundRole.isPresent()) {
            throw new RoleNotFoundException("Role with id : " + id + " was not found!");
        }

        roleRepository.deleteById(id);
        return foundRole;
    }
}

