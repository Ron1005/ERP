package com.erp.erp.controller;

import com.erp.erp.model.Customer;
import com.erp.erp.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping("/customers")
    public List<Customer> getCustomers(){
        return customerService.getCustomerCodes();
    }

    @PostMapping("/customer")
    public void createCustomer(@RequestBody Map<String,Object> body){
        customerService.createCustomer(body);
    }
}
