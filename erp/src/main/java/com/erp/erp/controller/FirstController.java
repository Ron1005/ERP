package com.erp.erp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FirstController {

    @GetMapping("/")
    public String index(){
        return "Welcome to ERP";
    }
}
