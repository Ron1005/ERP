package com.erp.erp.repository;

import com.erp.erp.model.TransactionInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionInvoiceRepository extends JpaRepository<TransactionInvoice,Integer> {

}
