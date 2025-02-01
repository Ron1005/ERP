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
            addItemToList({ ...selectedItem, orderquantity: quantity })
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

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Transaction Item</h2>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <select 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Item Description:</label>
                <div className="border border-gray-300 rounded-md p-2 mt-1">
                    {selectedItem?.description}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Available Quantity:</label>
                <div className="border border-gray-300 rounded-md p-2 mt-1">
                    {selectedItem?.quantity}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price:</label>
                <div className="border border-gray-300 rounded-md p-2 mt-1">
                    ${selectedItem?.price.toFixed(2)}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Select Item Quantity:</label>
                <input 
                    type="number" 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>

            <button
                onClick={addItem}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
                Add Item
            </button>
        </div>
    )
}
