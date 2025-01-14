"use client"
import { useEffect, useState } from "react"
import { Item as ItemInterface }  from '../../constants';
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Item(){
    const[listofitems,setlistofitems] = useState<ItemInterface[]>([])
    const router = useRouter()
    
    const fetchItems = async () =>{
        const response  = await fetch('http://localhost:8080/items',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.status==200){
            const res  = await response.json()
            setlistofitems(res)
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
                router.push('/item/createItem')
            }}
            >
                Create Item
            </button>
            {
                listofitems.map((item:ItemInterface)=>{
                    return(
                        <div key={item.itemId}>
                        <div>
                            {item.name}
                        </div>
                        <div>
                             {item.price}
                        </div>
                        </div>
                    )
                })
            }
        </div>
    )
}