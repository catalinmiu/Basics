package com.basics.backend.controller;

import com.basics.backend.model.Category;
import com.basics.backend.service.CategoryService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

@RunWith(SpringRunner.class)
@WebMvcTest(CategoryController.class)
public class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService categoryService;

    @Test
    public void givenUserADMIN_whenGetUsers_thenOK() throws Exception{
        List<Category> categories = new ArrayList<>();
        Category category1 = new Category("category1");
        Category category2 = new Category("category2");
        categories.add(category1);
        categories.add(category2);

        Mockito.when(categoryService.findAll()).thenReturn(categories);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/categories")
        )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title", is(category1.getTitle())))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].title", is(category2.getTitle())));
    }
}
