package com.erp.erp.repository;

import com.erp.erp.model.TransactionItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionItemsRepository extends JpaRepository<TransactionItems,Long> {
}
