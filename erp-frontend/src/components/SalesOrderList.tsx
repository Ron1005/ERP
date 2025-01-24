"use client"
import { Transaction } from "@/constants";
import { useRouter } from "next/navigation";
export default function SalesOrderList({salesorder}:{salesorder:Transaction}){

    const router = useRouter();
    
    const opensalesorder = () =>{
            router.push(`salesorder/viewsalesorder?id=${salesorder.transactionId}`)
    }

    return(
        <div>
                            Transaction Id: {salesorder.transactionId} 
                            Transaction Type: {salesorder.transactionType} 
                            Transaction Date: {salesorder.transactionDate} 
                            Transaction Status: {salesorder.status}
                            Trannsaction Total Price: {salesorder.totalprice}
        <button style={{color:'blue'}} onClick={opensalesorder}>View Transaction</button> 
        </div>
    )
}