"use client"
import { TransactionDetail } from "@/constants"
import { useSearchParams,useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export default function CreateSalesInvoice(){
    const router = useRouter()
    const params = useSearchParams()
    const id = params.get('id')
    const[transaction,settransaction] = useState<TransactionDetail>()
    const [formData,setformData] = useState({
        invoiceDate:"",
        billingAddress:"",
        comments:""
    })

    const createInvoice = async (e: { preventDefault: () => void }) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:8080/transactioninvoice',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                transactionId:transaction?.transactionId,
                transactionInvoiceDate:formData.invoiceDate,
                billingAddress:formData.billingAddress,
                comments:formData.comments
            })
        })
        if(response.status==200){
            console.log("Invoice Created")
            router.push('/sales/salesinvoice')
        }
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
             <form>
                <label>Invoice Date:</label>
                <input type="date" required style={{borderStyle:'solid',borderWidth:5,margin:10}}
             value={formData.invoiceDate}
             onChange={(e)=>{
                 setformData({...formData,invoiceDate:e.target.value})
             }}
            ></input>
            <label>Billing Address:</label>
            <input type="text" required style={{borderStyle:'solid',borderWidth:5,margin:10}}
              value={formData.billingAddress}
              onChange={(e)=>{
                  setformData({...formData,billingAddress:e.target.value})
              }}
            ></input>
            <label>Comments</label>
            <input type="text" required style={{borderStyle:'solid',borderWidth:5,margin:10}}
            value={formData.comments}
            onChange={(e)=>{
                setformData({...formData,comments:e.target.value})
            }}
            ></input>
            <label>Total Invoice Price: </label>
            <label style={{borderStyle:'solid',borderWidth:5,margin:10}}>{transaction?.totalprice}</label>
            <button style={{color:"blue"}} onClick={createInvoice}>Create Invoice</button>
             </form>
            <div>
            Sales Order ID is {transaction?.transactionId}
            Transaction Date: {transaction?.transactionDate}
            Transaction Type: {transaction?.transactionType}
            Transaction Price: {transaction?.totalprice}
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
             </div>
        </div>
    )
}