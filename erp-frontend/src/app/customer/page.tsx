"use client"
import { useEffect, useState } from "react"
import { Customer as CustomerInterface } from '../../constants';
import { useRouter } from "next/navigation";

export default function Customer() {
    const [listofcustomers, setlistofcustomers] = useState<CustomerInterface[]>([])
    const router = useRouter()
    
    const fetchCustomers = async () => {
        const response = await fetch('http://localhost:8080/customers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            const res = await response.json()
            setlistofcustomers(res)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Customers List
                    </h1>
                    <button
                        onClick={() => {
                            router.push('/customer/createcustomer')
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Create Customer
                    </button>
                </div>

                {/* Customers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listofcustomers.map((customer: CustomerInterface) => (
                        <div key={customer.customerId} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100">
                            <div className="text-lg font-semibold text-gray-800 mb-2">
                                {customer.customerCode}
                            </div>
                            {/* Add more customer details here if needed */}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {listofcustomers.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
                        <p className="text-gray-500">Create your first customer to get started.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
