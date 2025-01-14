package com.erp.erp.services;

import com.erp.erp.model.Customer;
import com.erp.erp.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository repo;

    public List<Customer> getCustomerCodes(){
        return repo.findAll();
    }

    public void createCustomer(Map<String, Object> body){
        Customer Cust = new Customer();
        Cust.setCustomerCode((String) body.get("customerCode"));
        repo.save(Cust);
    }
}
