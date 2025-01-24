package com.erp.erp.model;
import com.erp.erp.Views;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactioninvoice")
public class TransactionInvoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.TransactionInvoiceList.class)
    private int transactionInvoiceId;

    @Column(nullable = false)
    @JsonView(Views.TransactionInvoiceList.class)
    private LocalDate invoiceDate;

    @Column(nullable = false)
    @JsonView(Views.TransactionInvoiceDetail.class)
    private String billingAddress;

    @Column(nullable = false)
    @JsonView(Views.TransactionInvoiceList.class)
    private BigDecimal totalInvoicePrice;

    @Column(nullable = true)
    @JsonView(Views.TransactionInvoiceDetail.class)
    private String comments;

    @OneToOne()
    @JoinColumn(name = "transactionId")
    @JsonView(Views.TransactionInvoiceList.class)
    private Transaction transaction;

    @Column(nullable = false)
    @JsonView(Views.TransactionInvoiceList.class)
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public int getTransactionInvoiceId() {
        return transactionInvoiceId;
    }

    public void setTransactionInvoiceId(int transactionInvoiceId) {
        this.transactionInvoiceId = transactionInvoiceId;
    }

    public LocalDate getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(LocalDate invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public BigDecimal getTotalInvoicePrice() {
        return totalInvoicePrice;
    }

    public void setTotalInvoicePrice(BigDecimal totalInvoicePrice) {
        this.totalInvoicePrice = totalInvoicePrice;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }



}
