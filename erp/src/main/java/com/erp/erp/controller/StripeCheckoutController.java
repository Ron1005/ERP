package com.erp.erp.controller;
import com.erp.erp.services.StripeService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import com.stripe.net.ApiResource;

@RestController
@CrossOrigin
public class StripeCheckoutController {

    @Value("${stripe.api.secretKey}")
    private String stripeApiKey;

    @Value("${app.domain}")
    private String appDomain;

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-checkout-session")
    public String createCheckoutSession(@RequestBody Map<String,Object> body) throws StripeException {
        // Set the Stripe API key
//        Stripe.apiKey = stripeApiKey;
//
//        // Create Checkout Session parameters
//        SessionCreateParams params = SessionCreateParams.builder()
//                .setMode(SessionCreateParams.Mode.PAYMENT)
//                .setSuccessUrl(appDomain + "/success.html")
//                .setCancelUrl(appDomain + "/cancel.html")
//                .addLineItem(
//                        SessionCreateParams.LineItem.builder()
//                                .setQuantity(1L)
//                                .setPrice("price_1Pt2dbLPAniNCIfVgEJRftVS")
//                                .build())
//                .build();
//
//        // Create the Checkout Session
//        Session session = Session.create(params);
//
//        // Return the redirect URL
//        return session.getUrl();
          return stripeService.HandleStripePayment(body);
    }

    @PostMapping("/webhooks")
    public String webhook(@RequestBody String rawPayload, @RequestHeader("Stripe-Signature") String headerValue ) {
        try {
            // Use Gson or ObjectMapper for manual parsing
//            Gson gson = new Gson();
//            Event event = gson.fromJson(rawPayload, Event.class);

            // Or
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(rawPayload);
            //Event event = objectMapper.readValue(rawPayload, Event.class);

            //System.out.println("Raw Payload: " + rawPayload);
            //System.out.println("API Version Event: " + jsonNode.get("api_version"));
            //System.out.println(headerValue);
            //return "";
            return stripeService.handleWebhook(jsonNode,headerValue,rawPayload);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error parsing webhook";
        }
    }
}

