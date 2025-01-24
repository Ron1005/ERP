package com.erp.erp.model;

import com.erp.erp.Views;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity()
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({Views.Summary.class,Views.TransactionInvoiceList.class})
    private int transactionId;

    @Column(nullable = false)
   @JsonView({Views.Summary.class,Views.TransactionInvoiceList.class})
    private String transactionType;

    @Column(nullable = false)
    @JsonView({Views.Summary.class,Views.TransactionInvoiceList.class})
    private LocalDate transactionDate;

    public BigDecimal getTotalprice() {
        return totalprice;
    }

    public void setTotalprice(BigDecimal totalprice) {
        this.totalprice = totalprice;
    }

    @Column(nullable = false)
   @JsonView({Views.Summary.class,Views.TransactionInvoiceDetail.class})
    private BigDecimal totalprice;

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<TransactionItems> getTransactionItems() {
        return transactionItems;
    }

    public void setTransactionItems(List<TransactionItems> transactionItems) {
        this.transactionItems = transactionItems;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Column(nullable = false)
    @JsonView({Views.Summary.class,Views.TransactionInvoiceList.class})
    private String status;

    @ManyToOne()
    @JoinColumn(name = "customerId")
    @JsonView({Views.Detail.class,Views.TransactionInvoiceList.class})
    private Customer customer;

    @OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonView({Views.Detail.class,Views.TransactionInvoiceDetail.class})
    private List<TransactionItems> transactionItems;

}
