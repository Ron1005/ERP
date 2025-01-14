package com.erp.erp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity()
@Table(name = "transactionitems")
public class TransactionItems {

    @Id
    @GeneratedValue
    private int transactionItemId;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getTransactionItemId() {
        return transactionItemId;
    }

    public void setTransactionItemId(int transactionItemId) {
        this.transactionItemId = transactionItemId;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }


    public BigDecimal getTotalprice() {
        return totalitemprice;
    }

    public void setTotalprice(BigDecimal totalitemprice) {
        this.totalitemprice = totalitemprice;
    }

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private BigDecimal totalitemprice;

    @ManyToOne()
    @JoinColumn(name = "itemId")
    @JsonIgnore
    private Item item;

    @ManyToOne()
    @JoinColumn(name = "transactionId")
    @JsonIgnore
    private Transaction transaction;

}
