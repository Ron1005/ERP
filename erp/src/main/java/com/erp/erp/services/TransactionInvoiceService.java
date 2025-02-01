package com.erp.erp.services;

import com.erp.erp.model.Transaction;
import com.erp.erp.model.TransactionInvoice;
import com.erp.erp.repository.TransactionInvoiceRepository;
import com.erp.erp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TransactionInvoiceService {

    @Autowired
    private TransactionInvoiceRepository repo;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionService transactionService;

    public List<TransactionInvoice> getTransactionInvoices(){
        return repo.findAll();
    }

    public void createTransactionInvoice(@RequestBody Map<String, Object> body){
        TransactionInvoice newTransactionInvoice = new TransactionInvoice();
        int transactionId = (Integer) body.get("transactionId");
        Optional<Transaction> transaction = transactionRepository.findById(transactionId);
        transaction.ifPresent(tran->transactionService.updateTransactionStatus(tran,"Converted"));
        transaction.ifPresent(newTransactionInvoice::setTransaction);
        LocalDate localDate = LocalDate.parse((String) body.get("transactionInvoiceDate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        newTransactionInvoice.setInvoiceDate(localDate);
        transaction.ifPresent(tran->newTransactionInvoice.setTotalInvoicePrice(tran.getTotalprice()));
        newTransactionInvoice.setBillingAddress((String) body.get("billingAddress"));
        newTransactionInvoice.setComments((String) body.get("comments"));
        newTransactionInvoice.setStatus("Approved");
        repo.save(newTransactionInvoice);
    }
    public TransactionInvoice getTransactionInvoice(int id){
        Optional<TransactionInvoice> T = repo.findById(id);
        return T.orElseThrow(() -> new RuntimeException("Transaction Invoice not found!"));
    }

    public void updateTransactionInvoiceStatus(Integer invoiceId,String status){
        Optional<TransactionInvoice> transactionInvoice = repo.findById(invoiceId);
        transactionInvoice.ifPresent(traninvoice -> {
            Transaction T = traninvoice.getTransaction();
            T.setStatus("Closed");
            transactionRepository.save(T);
            traninvoice.setStatus(status);
            repo.save(traninvoice);  // Explicitly save the updated entity
        });
    }
}
