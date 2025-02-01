"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Item } from "@/constants"

export default function ViewItem() {
    const params = useSearchParams()
    const [item, setitem] = useState<Item | null>(null); // Initialize item as null

    const fetchItemDetail = async () => {
        const itemId = params.get('itemId')
        const response = await fetch(`http://localhost:8080/item/${itemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            const res = await response.json()
            setitem(res)
        }
    }

    useEffect(() => {
        fetchItemDetail()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Item Details
                    </h1>
                </div>

                {/* Item Details Section */}
                {item ? (
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {item.name}
                        </h2>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="text-xl font-bold text-blue-600 mb-2">
                            Price: ${item.price.toFixed(2)}
                        </div>
                        <div className="text-gray-800 mb-2">
                            Quantity Available: {item.quantity}
                        </div>
                        <div className="text-gray-500">
                            Item ID: {item.itemId}
                        </div>
                    </div>
                ) : (
                    // Loading or Empty State
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading item details...</h3>
                    </div>
                )}
            </div>
        </div>
    )
}
