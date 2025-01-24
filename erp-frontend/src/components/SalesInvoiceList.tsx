"use client"
import { TransactionInvoice } from "@/constants";
import { useRouter } from "next/navigation";
export default function SalesInvoiceList({salesInvoice}:{salesInvoice:TransactionInvoice}){

    const router = useRouter();
        
    const opensalesinvoice = () =>{
                router.push(`salesinvoice/viewsalesinvoice?id=${salesInvoice.transactionInvoiceId}`)
    }
        

    return(
     
        <div key={salesInvoice.transactionInvoiceId}>
                            Transaction Invoice Id: {salesInvoice.transactionInvoiceId} 
                            Transaction Invoice Date: {salesInvoice.invoiceDate} 
                            Transaction Invoice Total Value: {salesInvoice.totalInvoicePrice}
                            Transaction Invoice Status : {salesInvoice.status}
                            Sales Order Id: {salesInvoice.transaction.transactionId} 
                            Customer Code: {salesInvoice.transaction.customer.customerCode}
                            <button style={{color:'blue'}} onClick={opensalesinvoice}>View Invoice</button> 
        </div>

    )
}