"use client"
import TransactionItemForm from "@/components/TransactionItemForm"
import { use, useEffect, useState } from "react"
import { Customer } from "@/constants"
import { Item } from "@/constants"
import { useRouter } from "next/navigation"
export default function CreateSalesOrder(){
    const router = useRouter()
    const [formData,setformData] = useState({
        transactionType:"",
        transactionDate:"",
        customerCode:""
    })
    const [itemlist,setitemlist] = useState<any[]>([])
    const [customerselect,setcustomerselect] = useState<Customer[]>([]);
    const [itemsselect,setitemsselect] = useState<Item[]>([])
    const fillSelects = async () =>{
        const response  = await fetch('http://localhost:8080/customers',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.status==200){
            const res  = await response.json()
            setcustomerselect(res)
            //console.log(await response.json())
        }
        const responseitems  = await fetch('http://localhost:8080/items',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(responseitems.status==200){
            const resitems  = await responseitems.json()
            setitemsselect(resitems)
            //console.log(await response.json())
        }
    }

    const addItemToList = (item:any) =>{
        console.log(item)
        setitemlist([...itemlist,item])
    }

    const createSalesOrder = async () =>{
        const transactionItems  = itemlist.map((item)=>{
            return {
                name:item.name,
                quantity:parseInt(item.orderquantity)
            }
        })
        console.log(transactionItems)
        console.log(formData)
        const finalData = {...formData,transactionItems:transactionItems}
        console.log(finalData)
        const response = await fetch('http://localhost:8080/transaction',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(finalData)
        })
        if(response.status==200){
            console.log("Transaction Created")
            router.back()
        }

    }
    useEffect(()=>{
        fillSelects()
    },[])

    return(
        <div>
        <form>
            <label>Transaction Type</label>
            <select required style={{borderStyle:'solid',borderWidth:5,margin:10}}
            value={formData.transactionType}
            onChange={(e)=>{
                setformData({...formData,transactionType:e.target.value})
            }}
            >
                <option value={"None"}>--Select Transaction Type--</option>
                <option value={"Sales Order"}>Sales Order</option>
            </select>
            <label>Transaction Date:</label>
            <input type="date" required style={{borderStyle:'solid',borderWidth:5,margin:10}}
             value={formData.transactionDate}
             onChange={(e)=>{
                 setformData({...formData,transactionDate:e.target.value})
             }}
            ></input>
            <label>Customer Code:</label>
            <select required style={{borderStyle:'solid',borderWidth:5,margin:10}}
             value={formData.customerCode}
             onChange={(e)=>{
                 setformData({...formData,customerCode:e.target.value})
             }}
            >
                <option value={"None"}>--Select Customer Code--</option>
                {
                    customerselect.map((customer)=>{
                        return(
                            <option value={customer.customerCode} key={customer.customerId}>{customer.customerCode}</option>
                        )
                    })
                }
            </select>
           <div>
            Enter Transaction Items
           </div>
        </form>
        {
            itemlist.map((item)=>{
                return(
                    <div key={item.itemId}>
                        {item.name}
                        {item.orderquantity}
                    </div>
                )
            })
        }
        <TransactionItemForm itemsselect={itemsselect} addItemToList={addItemToList}/>
        <button onClick={createSalesOrder}>Create Sales Order</button>
        </div>
    )
}