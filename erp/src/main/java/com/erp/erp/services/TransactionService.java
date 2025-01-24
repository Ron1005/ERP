package com.erp.erp.services;

import com.erp.erp.model.Customer;
import com.erp.erp.model.Transaction;
import com.erp.erp.model.TransactionItems;
import com.erp.erp.repository.CustomerRepository;
import com.erp.erp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository repo;

    @Autowired
    private CustomerRepository customerrepo;

    @Autowired
    private TransactionItemService transactionItemService;

    public List<Transaction> getTransactions(){
        return repo.findAll();
    }

    public Transaction findByIdWithItems(int id) {
        Optional<Transaction> T = repo.findById(id);
        return T.orElseThrow(() -> new RuntimeException("Transaction not found!"));
    }

    public void createTransaction(@RequestBody Map<String, Object> body){
        Transaction newTransaction = new Transaction();
        newTransaction.setTransactionType((String) body.get("transactionType"));
        LocalDate localDate = LocalDate.parse((String) body.get("transactionDate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        newTransaction.setTransactionDate(localDate);
        newTransaction.setTotalprice(BigDecimal.ZERO);
        newTransaction.setStatus("Approved");
        Optional<Customer> Cust  = customerrepo.findAll().stream().filter(
                customer -> customer.getCustomerCode().equals((String) body.get("customerCode"))).findFirst();
        Cust.ifPresent(newTransaction::setCustomer);
        repo.save(newTransaction);
        System.out.println(newTransaction.getTransactionId());
        List<Map<String,Object>> transactionItems = (List<Map<String,Object>>) body.get("transactionItems");
        transactionItemService.createTransactionItems(transactionItems,newTransaction);
//        for(Map<String,Object> obj:transactionItems){
//            TransactionItems TI = new TransactionItems();
//            System.out.println(obj.get("name"));
//            System.out.println(obj.get("quantity"));
//        }
    }

    public void updateTransactionStatus(Transaction T,String status){
        T.setStatus(status);
        repo.save(T);
    }
}
