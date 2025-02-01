"use client"

import { useEffect, useState } from "react"
import { Item as ItemInterface } from '../../constants';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Item() {
    const [listofitems, setlistofitems] = useState<ItemInterface[]>([])
    const router = useRouter()

    const fetchItems = async () => {
        const response = await fetch('http://localhost:8080/items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status == 200) {
            const res = await response.json()
            setlistofitems(res)
        }
    }

    const redirectToItem = (itemId:number) =>{
        router.push(`/item/viewItem?itemId=${itemId}`)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Items List
                    </h1>
                    <button
                        onClick={() => {
                            router.push('/item/createItem')
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Create Item
                    </button>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listofitems.map((item: ItemInterface) => (
                        <div
                            key={item.itemId}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100"
                            onMouseDown={()=>{redirectToItem(item.itemId)}}
                        >
                            <div className="text-lg font-semibold text-gray-800 mb-2">
                                {item.name}
                            </div>
                            <div className="text-2xl font-bold text-blue-600">
                                ${item.price.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {listofitems.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                        <p className="text-gray-500">Create your first item to get started.</p>
                    </div>
                )}
            </div>
        </div>
    )
}