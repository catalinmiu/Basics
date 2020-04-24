package com.basics.backend.controller;


import com.basics.backend.config.Roles;
import com.basics.backend.model.Role;
import com.basics.backend.model.User;
import com.basics.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.toIntExact;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    public void givenUserADMIN_whenGetUsers_thenOK() throws Exception{
        Role role = new Role(3L, Roles.ADMIN.toString());
        List<Role> roles = new ArrayList<>();
        roles.add(role);
        User user = new User("Gabriel", "Cotici", "coticigaby@yahoo.com", "alabalaportocala", roles);
        List<User> users = new ArrayList<>();
        users.add(user);
        Mockito.when(userService.findAll()).thenReturn(users);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/users")
        )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName", is(user.getFirstName())))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastName", is(user.getLastName())))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].email", is(user.getEmail())))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].roles[0].id", is(toIntExact(role.getId()))));
    }

    @Test
    public void givenADMIN_whenAddUsers_thenCreated() throws Exception{
        List<Role> roles = new ArrayList<>();
        Role role = new Role(3L, Roles.ADMIN.toString());
        roles.add(role);
        User user = new User("Gabriel", "Cotici", "coticigaby@yahoo.com", "alabalaportocala", roles);

        ObjectMapper objectMapper =  new ObjectMapper();
        String jsonUser = objectMapper.writeValueAsString(user);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/users").content(jsonUser).contentType(MediaType.APPLICATION_JSON)
        ). andExpect(MockMvcResultMatchers.status().isCreated());
    }
}
