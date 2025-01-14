"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function CreateCustomer(){

    //const [item,setitem] = useState<ItemInterface>()
    const [formData,setformData] = useState({
        customerCode:"",
    })
    const router = useRouter();
    const createNewCustomer = async (e: { preventDefault: () => void }) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:8080/customer',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                customerCode:formData.customerCode,
            })
        })
        if(response.status==200){
            console.log("Print Successful")
            router.back()
        }
    }

    return(
        <div>
        <div>
            Create Customer Page
        </div>
        <form>
            <label>
                Customer Code:
            </label>
            <input type="text" required style={{borderStyle:'solid',borderWidth:5,margin:10}} value={formData.customerCode}
            onChange={(e)=>{
                setformData({
                    ...formData,
                    customerCode:e.target.value
                })
            }}
            ></input>
            <input type="submit" value={"Create Customer"}
            onClick={createNewCustomer}
            ></input>
        </form>
        </div>
        
    )
}