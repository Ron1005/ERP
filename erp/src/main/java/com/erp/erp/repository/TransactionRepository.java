package com.erp.erp.repository;

import com.erp.erp.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer> {

}
