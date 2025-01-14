package com.erp.erp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "customer")
public class Customer {

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

//    public List<Transaction> getTransactions() {
//        return transactions;
//    }
//
//    public void setTransactions(List<Transaction> transactions) {
//        this.transactions = transactions;
//    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customerId;

    @Column(nullable = false,unique = true)
    private String customerCode;

//    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JsonIgnore()
//    private List<Transaction> transactions;
}
