package com.erp.erp.services;

import com.erp.erp.model.Item;
import com.erp.erp.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class ItemService {

    @Autowired
    ItemRepository repo;
    public List<Item> getItems(){
        return repo.findAll();
    }

    public void createItem(Map<String ,Object> body){
        Item item = new Item();
        item.setName((String) body.get("name"));
        item.setDescription((String) body.get("description"));
        BigDecimal price = new BigDecimal(String.valueOf(body.get("price")));
        BigDecimal quantity = new BigDecimal(String.valueOf(body.get("quantity")));
        item.setPrice(price);
        item.setQuantity(quantity);
        repo.save(item);
    }

    public void updateItemQuantity(Item item,int quantity){
        item.setQuantity(item.getQuantity().subtract(new BigDecimal(quantity)));
        repo.save(item);
    }
}
