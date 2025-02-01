"use client"

import { useState } from 'react';
import { Item as ItemInterface } from '../../../constants';
import { useRouter } from 'next/navigation';

export default function CreateItem() {
    const router = useRouter()
    const [formData, setformData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: ""
    })

    const createNewItem = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8080/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                description: formData.description,
                price: formData.price,
                quantity: formData.quantity
            })
        })
        if (response.status == 200) {
            console.log("Item Created Successful")
            alert(`Item ${formData.name} is created successfully`)
            router.back()
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Create Item
                    </h1>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Item Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.name}
                                onChange={(e) => {
                                    setformData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Item Description
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.description}
                                onChange={(e) => {
                                    setformData({
                                        ...formData,
                                        description: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Item Price
                            </label>
                            <input
                                type="number"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.price}
                                onChange={(e) => {
                                    setformData({
                                        ...formData,
                                        price: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Item Quantity
                            </label>
                            <input
                                type="number"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.quantity}
                                onChange={(e) => {
                                    setformData({
                                        ...formData,
                                        quantity: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={createNewItem}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Create Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}