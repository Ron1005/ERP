package com.erp.erp.services;

import com.erp.erp.model.Customer;
import com.erp.erp.model.Item;
import com.erp.erp.model.Transaction;
import com.erp.erp.model.TransactionItems;
import com.erp.erp.repository.ItemRepository;
import com.erp.erp.repository.TransactionItemsRepository;
import com.erp.erp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TransactionItemService {

    @Autowired
    private TransactionItemsRepository repo;

    @Autowired
    private ItemRepository itemrepo;

    @Autowired
    private ItemService itemService;

    @Autowired
    private TransactionRepository transactionRepository;

    public List<TransactionItems> getTransactionItems(){
        return repo.findAll();
    }

    public void createTransactionItems(List<Map<String,Object>> transactionItems, Transaction newTransaction){
        BigDecimal transactionTotalPrice = BigDecimal.ZERO;
        List<TransactionItems> transactionItemsList = new ArrayList<>();
        for(Map<String,Object> obj:transactionItems){
            TransactionItems TI = new TransactionItems();
            Optional<Item> item  = itemrepo.findAll().stream().filter(
                    item1 -> item1.getName().equals((String) obj.get("name"))).findFirst();
            item.ifPresent(TI::setItem);
            item.ifPresent(item1 -> TI.setTotalprice(item1.getPrice().multiply(new BigDecimal((Integer) obj.get("quantity"))).setScale(2, RoundingMode.FLOOR)));
            TI.setQuantity((Integer) obj.get("quantity"));
            TI.setTransaction(newTransaction);
            item.ifPresent(item1->itemService.updateItemQuantity(item1,(Integer) obj.get("quantity")));
            repo.save(TI);
            transactionItemsList.add(TI);
            transactionTotalPrice = transactionTotalPrice.add(TI.getTotalprice());
        }
        if(!transactionTotalPrice.equals(BigDecimal.ZERO)){
            newTransaction.setTotalprice(transactionTotalPrice);
            //newTransaction.setTransactionItems(transactionItemsList);
            transactionRepository.save(newTransaction);
        }
    }
}
