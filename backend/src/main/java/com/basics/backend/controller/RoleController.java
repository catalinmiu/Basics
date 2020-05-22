package com.basics.backend.controller;

import com.basics.backend.exception.RoleNotFoundException;
import com.basics.backend.model.Role;
import com.basics.backend.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
@CrossOrigin(origins = "http://localhost:3000")
public class RoleController {

    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<Role>> findAllRoles() {
        List<Role> roleList = roleService.findAll();
        return ResponseEntity.ok(roleList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Role>> findRoleById(@PathVariable Long id) {
        Optional<Role> foundRole = roleService.findById(id);
        if (! foundRole.isPresent()) {
            throw new RoleNotFoundException("Role with id : " + id + " was not found!");
        }

        return ResponseEntity.ok(foundRole);
    }

    @PostMapping
    public ResponseEntity<Object> addRole(@Valid @RequestBody Role role) {
        Role savedRole = roleService.save(role);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedRole.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Role>> deleteRole(@PathVariable Long id) {
        Optional<Role> foundRole = roleService.findById(id);
        if (! foundRole.isPresent()) {
            throw new RoleNotFoundException("Role with id : " + id + " was not found!");
        }

        roleService.deleteById(id);
        return ResponseEntity.ok(foundRole);
    }
}

