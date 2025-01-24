"use client"
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { TransactionInvoice } from "@/constants";
import SalesInvoiceList from "@/components/SalesInvoiceList";
export default function SalesInvoice(){
     const [listofsalesinvoices,setlistofsalesinvoices] = useState<TransactionInvoice[]>([])
    
        const fetchSalesInvoices = async () =>{
            const response = await fetch('http://localhost:8080/transactioninvoices',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(response.status==200)
            {   
                const res  = await response.json()
                setlistofsalesinvoices(res)
            }
        }
    
        useEffect(()=>{
            fetchSalesInvoices()
        },[])

    return(
        <div>
            Sales Invoice Listing
            {
                listofsalesinvoices.map((salesInvoice)=>{
                    return(
                       <SalesInvoiceList salesInvoice={salesInvoice} key={salesInvoice.transactionInvoiceId}/>
                    )
                })
            }
        </div>
    )
}