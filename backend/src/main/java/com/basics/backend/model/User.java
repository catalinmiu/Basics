package com.basics.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity(name = "Users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"} )
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    public User(String firstName, String lastName, String email, String password, List<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Size(min = 2,max = 50, message = "First name should be between 2 and 50 characters")
    @NotNull(message = "First name cannot be null")
    private String firstName;

    @Size(min = 2, max = 50, message = "Last name should be between 2 and 50 characters")
    private String lastName;

    @Email(message = "Email should be valid")
    private String email;

    @NotNull
    @Size(min = 8)
    private String password;

    @NotNull
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable (
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    @JsonIgnoreProperties("users")
    private List<Role> roles;
}
