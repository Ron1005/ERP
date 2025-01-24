"use client"
import { useSearchParams } from "next/navigation"
import { TransactionInvoiceDetail } from "@/constants"
import { useState,useEffect } from "react"
export default function ViewSalesInvoice(){
        const[transactionInvoice,settransactionInvoice] = useState<TransactionInvoiceDetail>()
        const params = useSearchParams()
        const fetchTransactionDetail = async () =>{
            const id = params.get('id')
            const response  = await fetch(`http://localhost:8080/transactioninvoice/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(response.status==200){
                const res  = await response.json()
                settransactionInvoice(res)
                //console.log(await response.json())
            }
        }
    
        useEffect(()=>{
            fetchTransactionDetail()
        },[])

    return(
        <div>
            View Sales Invoice Screen
            <div>
            Sales Invoice ID is {transactionInvoice?.transactionInvoiceId}
            Invoice Date: {transactionInvoice?.invoiceDate}
            Invoice Total Value: {transactionInvoice?.totalInvoicePrice}
            Invoice Status : {transactionInvoice?.status}
            Customer Code : {transactionInvoice?.transaction.customer.customerCode}
            Sales Order ID : {transactionInvoice?.transaction.transactionId}
            <div>
                <div>Transaction Items</div>
                {
                    transactionInvoice?.transaction.transactionItems.map((item)=>{
                        return(
                            <div key={item.transactionItemId}>
                                {item.item.name}
                                {item.item.description}
                                {item.quantity}
                                {item.totalprice}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <button style={{color:'green'}}>Complete Payment</button>
            </div>
            </div>
        </div>
    )
}