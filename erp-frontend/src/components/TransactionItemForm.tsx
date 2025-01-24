"use client"
import { Item } from "@/constants"
import { useState } from "react"

export default function TransactionItemForm({
    itemsselect, 
    addItemToList
}: {
    itemsselect: Item[], 
    addItemToList: (item: any) => void
}) {
    const [selectedItem, setSelectedItem] = useState<Item | undefined>()
    const [quantity, setQuantity] = useState("")

    const addItem = () => {
        if (selectedItem && quantity) {
            addItemToList({...selectedItem, orderquantity: quantity})
            setSelectedItem(undefined)
            setQuantity("")
        }
    }

    const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value

        if (selectedValue === "") {
            setSelectedItem(undefined)
        } else {
            const item = itemsselect.find(
                (item) => item.itemId.toString() === selectedValue
            )
            
            if (item) {
                setSelectedItem(item)
            }
        }
    }

    return(
        <div>
            <label>Item Name</label>
            <select 
                required 
                style={{borderStyle:'solid', borderWidth:5, margin:10}}
                value={selectedItem ? selectedItem.itemId.toString() : ""}
                onChange={handleItemChange}
            >
                <option value="">--Select Item Name--</option>
                {itemsselect.map((item) => (
                    <option key={item.itemId} value={item.itemId.toString()}>
                        {item.name}
                    </option>
                ))}
            </select>

            <label>Item Description:</label>
            <label style={{borderStyle:'solid', borderWidth:5, margin:10}}>
                {selectedItem?.description}
            </label>

            <label>Item Available Quantity:</label>
            <label style={{borderStyle:'solid', borderWidth:5, margin:10}}>
                {selectedItem?.quantity}
            </label>

            <label>Item Price:</label>
            <label style={{borderStyle:'solid', borderWidth:5, margin:10}}>
                {selectedItem?.price}
            </label>

            <label>Select Item Quantity:</label>
            <input 
                type="number" 
                required 
                style={{borderStyle:'solid', borderWidth:5, margin:10}} 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <button onClick={addItem}>Add</button>
        </div>
    )
}
