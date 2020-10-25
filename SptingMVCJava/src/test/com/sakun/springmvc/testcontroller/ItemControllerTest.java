package com.sakun.springmvc.testcontroller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.sakun.springmvc.controller.ItemController;
import com.sakun.springmvc.model.Item;
import com.sakun.springmvc.service.ItemService;
import org.springframework.util.LinkedMultiValueMap;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class ItemControllerTest {

    @Mock
    private ItemService itemService;

    @InjectMocks
    private ItemController itemController;

    private MockMvc mockMvc;

    static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Before
    public void setup() {
        MockitoAnnotations.openMocks(this); // openMocks used instead initMocks
        mockMvc = MockMvcBuilders.standaloneSetup(itemController).build();
    }

    @Test
    public void saveItemTest() throws Exception {
        Date date = new Date(12 - 12 - 2022);
        BigDecimal price = new BigDecimal(500);
        Item itemObject = new Item(1, "LG", "TV", price, "item description", date);

        when(itemService.saveItem(itemObject)).thenReturn(true);
        mockMvc.perform(post("/item")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(itemObject)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.brand", is("LG")))
                .andExpect(jsonPath("$.type", is("TV")))
                .andExpect(jsonPath("$.price", is(500)))
                .andExpect(jsonPath("$.description", is("item description")))
                .andExpect(jsonPath("$.expireDate", is(12 - 12 - 2022)));

    }

    @Test
    public void getItemTest() throws Exception {
        List<Item> items = new ArrayList<Item>();
        items.add(new Item());
        items.add(new Item());

        when(itemService.getAll()).thenReturn(items);
        mockMvc.perform(get("/item"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().string(asJsonString(items)));

    }

    @Test
    public void deleteItemTest() throws Exception {
        Item itemObject = new Item();
        itemObject.setId(1);

        when(itemService.deleteItem(itemObject.getId())).thenReturn(true);
        mockMvc.perform(delete("/item/{id}", 1)).andExpect(status().isOk());
    }

    @Test
    public void searchItemsList() throws Exception {
        // parameter list
        LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap();
        requestParams.add("brand", "LG");
        requestParams.add("type", "TV");
        requestParams.add("description", "item description");

        // created hardcoded searchItemList
        List<Item> searchItemList = new ArrayList<Item>();
        Date date = new Date();
        BigDecimal price = new BigDecimal("100");
        Item item = new Item(1, "LG", "TV", price, "item description", date);
        searchItemList.add(item);

        when(itemService.getSearchedItems("LG", "TV", "item description")).thenReturn(searchItemList);

        mockMvc.perform(get("/searchItem")
                .params(requestParams))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().string(asJsonString(searchItemList)));
    }


}
