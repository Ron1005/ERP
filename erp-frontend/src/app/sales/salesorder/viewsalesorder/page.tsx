"use client"
import { useSearchParams,useRouter } from "next/navigation"
import { TransactionDetail } from "@/constants"
import { useEffect, useState } from "react"
export default function viewsalesorder(){
    const[transaction,settransaction] = useState<TransactionDetail>()
    const params = useSearchParams()
    const router = useRouter()
    const convertToInvoice = () =>{
        router.push(`/sales/salesinvoice/createsalesinvoice?id=${transaction?.transactionId}`)
    }
    const fetchTransactionDetail = async () =>{
        const id = params.get('id')
        const response  = await fetch(`http://localhost:8080/transaction/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.status==200){
            const res  = await response.json()
            settransaction(res)
            //console.log(await response.json())
        }
    }

    useEffect(()=>{
        fetchTransactionDetail()
    },[])
    return(
        <div>
            Sales Order ID is {transaction?.transactionId}
            Transaction Date: {transaction?.transactionDate}
            Transaction Type: {transaction?.transactionType}
            Transaction Price: {transaction?.totalprice}
            Transaction Status: {transaction?.status}
            Customer Code : {transaction?.customer.customerCode}
            <div>
                <div>Transaction Items</div>
                {
                    transaction?.transactionItems.map((item)=>{
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
                {
                    transaction?.status == "Approved" ? (<button style={{color:'green'}} onClick={convertToInvoice}>Convert To Invoice</button>):(<div></div>)
                }
            </div>
        </div>
    )
}