package com.erp.erp.controller;

import com.erp.erp.model.Item;
import com.erp.erp.services.ItemService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("/items")
    public List<Item> getItems(){
        return itemService.getItems();
    }

    @PostMapping("/item")
    public void createItem(@RequestBody Map<String, Object> body) throws StripeException {
        System.out.println(body.toString());
        itemService.createItem(body);
    }

    @GetMapping("/item/{itemId}")
    public Item getItem(@PathVariable int itemId){
        return itemService.getItem(itemId);
    }

}
