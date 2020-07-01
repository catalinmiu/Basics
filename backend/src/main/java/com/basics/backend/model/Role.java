package com.basics.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity(name = "Roles")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    private Long id;
    @NotNull
    private String title;

    public Role(Long id, String title) {
        this.id = id;
        this.title = title;
    }
    public Role(String title) {
//        this.id = id;
        this.title = title;
    }

    @ManyToMany(mappedBy = "roles", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("roles")
    private List<User> users;
}
