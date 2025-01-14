"use client"
import { useState } from 'react';
import { Item as ItemInterface }  from '../../../constants';
export default function CreateItem(){

    //const [item,setitem] = useState<ItemInterface>()
    const [formData,setformData] = useState({
        name:"",
        description:"",
        price:"",
        quantity:""
    })
    const createNewItem = async (e: { preventDefault: () => void }) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:8080/item',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:formData.name,
                description:formData.description,
                price:formData.price,
                quantity:formData.quantity
            })
        })
        if(response.status==200){
            console.log("Print Successful")
        }
    }

    return(
        <div>
        <div>
            Create Item Page
        </div>
        <form>
            <label>
                Item Name:
            </label>
            <input type="text" required style={{borderStyle:'solid',borderWidth:5,margin:10}} value={formData.name}
            onChange={(e)=>{
                setformData({
                    ...formData,
                    name:e.target.value
                })
            }}
            ></input>
            <label>
                Item Description:
            </label>
            <input type="text" required style={{borderStyle:'solid',borderWidth:5,margin:10}} value={formData.description}
              onChange={(e)=>{
                setformData({
                    ...formData,
                    description:e.target.value
                })
            }}
            ></input>
            <label>
                Item Price:
            </label>
            <input type="number" required style={{borderStyle:'solid',borderWidth:5,margin:10}} value={formData.price}
             onChange={(e)=>{
                setformData({
                    ...formData,
                    price:e.target.value
                })
            }}
            ></input>
            <label>
                Item Quantity:
            </label>
            <input type="quantity" required style={{borderStyle:'solid',borderWidth:5,margin:10}} value={formData.quantity}
             onChange={(e)=>{
                setformData({
                    ...formData,
                    quantity:e.target.value
                })
            }}
            ></input>
            <input type="submit" value={"Create Item"}
            onClick={createNewItem}
            ></input>
        </form>
        </div>
        
    )
}