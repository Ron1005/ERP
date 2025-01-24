package com.erp.erp.controller;


import com.erp.erp.Views;
import com.erp.erp.model.TransactionInvoice;
import com.erp.erp.services.TransactionInvoiceService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class TransactionInvoiceController {

    @Autowired
    private TransactionInvoiceService transactionInvoiceService;

    @GetMapping("/transactioninvoices")
    @JsonView(Views.TransactionInvoiceList.class)
    public List<TransactionInvoice> getTransactionInvoices(){
        return transactionInvoiceService.getTransactionInvoices();
    }

    @PostMapping("/transactioninvoice")
    public void createTransactionInvoice(@RequestBody Map<String,Object> body){
        transactionInvoiceService.createTransactionInvoice(body);
    }

    @GetMapping("/transactioninvoice/{id}")
    @JsonView(Views.TransactionInvoiceDetail.class)
    public TransactionInvoice getTransaction(@PathVariable int id){
        return transactionInvoiceService.getTransactionInvoice(id);
    }
}
