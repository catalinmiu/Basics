package com.basics.backend.controller;

import com.basics.backend.exception.RoleNotFoundException;
import com.basics.backend.model.Role;
import com.basics.backend.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RoleController {

    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<Role> findAllRoles() {
        return roleService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Role> findRoleById(@PathVariable Long id) {
        Optional<Role> foundRole = roleService.findById(id);
        if (! foundRole.isPresent()) {
            throw new RoleNotFoundException("Role with id : " + id + " was not found!");
        }

        return foundRole;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Role addRole(@Valid @RequestBody Role role) {
        return roleService.save(role);
    }

    @DeleteMapping("/{id}")
    public Optional<Role> deleteRole(@PathVariable Long id) {
        Optional<Role> foundRole = roleService.findById(id);
        if (! foundRole.isPresent()) {
            throw new RoleNotFoundException("Role with id : " + id + " was not found!");
        }

        roleService.deleteById(id);
        return foundRole;
    }
}

