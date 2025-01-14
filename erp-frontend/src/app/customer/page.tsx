"use client"
import { useEffect, useState } from "react"
import { Customer as CustomerInterface }  from '../../constants';
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Customer(){
    const[listofcustomers,setlistofcustomers] = useState<CustomerInterface[]>([])
    const router = useRouter()
    
    const fetchItems = async () =>{
        const response  = await fetch('http://localhost:8080/customers',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.status==200){
            const res  = await response.json()
            setlistofcustomers(res)
            //console.log(await response.json())
        }
    }

    useEffect(()=>{
        fetchItems()
    },[])

    return(
        <div>
            <button
            onClick={()=>{
                router.push('/customer/createcustomer')
            }}
            >
                Create Customer
            </button>
            {
                listofcustomers.map((customer:CustomerInterface)=>{
                    return(
                        <div key={customer.customerId}>
                        <div>
                            {customer.customerCode}
                        </div>
                        </div>
                    )
                })
            }
        </div>
    )
}