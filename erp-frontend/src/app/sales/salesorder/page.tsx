"use client"
import { useEffect, useState } from "react"
import { Transaction } from "@/constants"
import { useRouter } from "next/navigation"
import SalesOrderList from "@/components/SalesOrderList"
export default function SalesOrder(){
    const [listofsalesorders,setlistofsalesorders] = useState<Transaction[]>([])
    const router = useRouter();

    // const opensalesorder = () =>{
    //     router.push(`salesorder/viewsalesorder?id=7`)
    // }

    const switchToSalesOrder = () =>{
        router.push('/sales/salesorder/createsalesorder')
    }

    const fetchSalesOrders = async () =>{
        const response = await fetch('http://localhost:8080/transactions',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.status==200)
        {   
            const res  = await response.json()
            setlistofsalesorders(res)
        }
    }

    useEffect(()=>{
        fetchSalesOrders()
    },[])
    return(
        <div>
            <button onClick={switchToSalesOrder} style={{color:"green"}}>Create Sales Order</button>
            {
                listofsalesorders.map((salesorder)=>{
                    return(
                       <SalesOrderList salesorder={salesorder} key={salesorder.transactionId}/>
                    )
                })
            }
        </div>
    )
}