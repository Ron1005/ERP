package com.erp.erp.controller;

import com.erp.erp.Views;
import com.erp.erp.model.Transaction;
import com.erp.erp.services.TransactionItemService;
import com.erp.erp.services.TransactionService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @Autowired
    TransactionItemService transactionItemService;

    @GetMapping("/transactions")
    @JsonView(Views.Summary.class)
    public List<Transaction> getTransactions(){
        return transactionService.getTransactions();
    }

    @GetMapping("/transaction/{id}")
    @JsonView(Views.Detail.class)
    public Transaction getTransaction(@PathVariable int id){
        return transactionService.findByIdWithItems(id);
    }

    @PostMapping("/transaction")
    public void createTransaction(@RequestBody Map<String,Object> body){
        transactionService.createTransaction(body);
        //transactionItemService.createTransactionItems((List<Map<String,Object>>) body.get("transactionItems"));
    }
}
