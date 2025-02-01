package com.erp.erp.services;
import com.erp.erp.model.TransactionInvoice;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.erp.erp.model.Item;
import com.erp.erp.repository.ItemRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.ProductUpdateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionRetrieveParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class StripeService {
    @Value("${stripe.api.secretKey}")
    private String stripeApiKey;

    @Value("${app.domain}")
    private String appDomain;

    @Value("${stripe.api.endpointSecret}")
    private String endpointSecret;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private TransactionInvoiceService transactionInvoiceService;

    public List<SessionCreateParams.LineItem> generateListofLineItems(List<Map<String,Object>> lineItems){
        List<SessionCreateParams.LineItem> lineitems = new ArrayList<>();
        for(Map<String,Object> obj:lineItems){
              Optional<Item> Item = itemRepository.findById(Long.valueOf((Integer) obj.get("itemId")));
              Item.ifPresent(item-> lineitems.add(
                      SessionCreateParams.LineItem.builder()
                              .setQuantity(Long.valueOf((Integer) obj.get("quantity")))
                              .setPrice(item.getPriceId())
                              .build()
              ));
        }
        return lineitems;
    }

    public String HandleStripePayment(Map<String,Object> body) throws StripeException {
        Stripe.apiKey = stripeApiKey;
        List<Map<String,Object>> lineItems = (List<Map<String,Object>>) body.get("lineItems");
        List<SessionCreateParams.LineItem> lineitems = generateListofLineItems(lineItems);
        // Create Checkout Session parameters
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(appDomain + "/sales/salesinvoice/success?invoiceId="+ (Integer) body.get("invoiceId"))
                .setCancelUrl(appDomain + "/cancel.html")
                .putMetadata("invoiceId", String.valueOf((Integer) body.get("invoiceId")))
                .addAllLineItem(lineitems)
                .build();

        // Create the Checkout Session
        Session session = Session.create(params);

        // Return the redirect URL
        return session.getUrl();
    }

    public void createProduct(Item item) throws StripeException {
        Stripe.apiKey = stripeApiKey;
        PriceCreateParams priceparams =
                PriceCreateParams.builder()
                        .setCurrency("aud")
                        .setUnitAmount(Long.valueOf(String.valueOf(item.getPrice().multiply(new BigDecimal(100)))))
                        .setProductData(
                                PriceCreateParams.ProductData.builder().setName(item.getName())
                                        .build()
                        )
                        .build();
        Price price = Price.create(priceparams);
        if(price!=null){
            Product demoproduct = Product.retrieve(price.getProduct());
            ProductUpdateParams productparams =
                    ProductUpdateParams.builder().setDescription(item.getDescription()).build();
            demoproduct.update(productparams);
            item.setPriceId(price.getId());
            itemRepository.save(item);
        }
    }

    public String handleWebhook(JsonNode payload,String sigHeader,String requestpayload) throws StripeException, JsonProcessingException {
//            EventDataObjectDeserializer dataObjectDeserializer = body.getDataObjectDeserializer();
//            System.out.println(dataObjectDeserializer);
//            StripeObject stripeObject = null;
//            if (dataObjectDeserializer.getObject().isPresent()) {
//                System.out.println(dataObjectDeserializer.getObject());
//                stripeObject = dataObjectDeserializer.getObject().get();
//            } else {
//                // Deserialization failed, probably due to an API version mismatch.
//                // Refer to the Javadoc documentation on `EventDataObjectDeserializer` for
//                // instructions on how to handle this case, or return an error here.
//            }
            System.out.println(payload.get("type"));
            if (payload.has("type") &&
                    "checkout.session.completed".equals(payload.get("type").asText())) {
                System.out.println("Works");
                Event event;
                try {
                     event = Webhook.constructEvent(requestpayload, sigHeader, endpointSecret);
                     System.out.println(event.getType());
                } catch (SignatureVerificationException e) {
                    // Invalid signature
                    System.out.println("Error occured");
                    return "";
                }
                if (
                        "checkout.session.completed".equals(event.getType())
                                || "checkout.session.async_payment_succeeded".equals(event.getType())
                ) {
                    Stripe.apiKey = stripeApiKey;
                    SessionRetrieveParams params =
                            SessionRetrieveParams.builder()
                                    .addExpand("line_items")
                                    .build();
                        System.out.println(event.getData());
                        ObjectMapper objectMapper = new ObjectMapper();
                        JsonNode jsonNode = objectMapper.readTree(event.getData().toJson());
                        String objectId = jsonNode.get("object").get("id").asText().replace("\"", "");
                        Session checkoutSession = Session.retrieve(objectId, params, null);
                        if(checkoutSession.getMetadata().get("invoiceId")!=null){
                            String InvoiceId = checkoutSession.getMetadata().get("invoiceId");
                            transactionInvoiceService.updateTransactionInvoiceStatus(Integer.valueOf(InvoiceId),"Payment Completed");
                        }

                }
            }

//        System.out.println(body);
//        System.out.println(body.getData());
//        System.out.println(body.getType());
        return "";
    }
}

