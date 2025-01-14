package com.erp.erp.controller;

import com.erp.erp.model.TransactionItems;
import com.erp.erp.services.TransactionItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TransactionItemController {

    @Autowired
    TransactionItemService transactionItemService;

    @GetMapping("/transactionitems")
    public List<TransactionItems> getTransactionItems(){
        return transactionItemService.getTransactionItems();
    }
}
