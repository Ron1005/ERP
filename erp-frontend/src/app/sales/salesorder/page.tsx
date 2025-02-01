"use client"
import { useEffect, useState } from "react"
import { Transaction } from "@/constants"
import { useRouter } from "next/navigation"
import SalesOrderList from "@/components/SalesOrderList"

export default function SalesOrder() {
    const [listofsalesorders, setlistofsalesorders] = useState<Transaction[]>([])
    const router = useRouter();

    const switchToSalesOrder = () => {
        router.push('/sales/salesorder/createsalesorder')
    }

    const fetchSalesOrders = async () => {
        const response = await fetch('http://localhost:8080/transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {   
            const res = await response.json()
            setlistofsalesorders(res)
        }
    }

    useEffect(() => {
        fetchSalesOrders()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Sales Orders</h1>
                    <button
                        onClick={switchToSalesOrder}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                    >
                        Create Sales Order
                    </button>
                </div>

                {/* Sales Order List */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    {listofsalesorders.length > 0 ? (
                        listofsalesorders.map((salesorder) => (
                            <SalesOrderList salesorder={salesorder} key={salesorder.transactionId} />
                        ))
                    ) : (
                        <p className="text-gray-500">No sales orders found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
