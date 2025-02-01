"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCustomer() {
    const [formData, setformData] = useState({
        customerCode: "",
    });
    const router = useRouter();

    const createNewCustomer = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerCode: formData.customerCode,
            })
        });
        if (response.status === 200) {
            console.log("Customer Created Successfully");
            router.back();
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Create Customer
                    </h1>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <form className="space-y-6" onSubmit={createNewCustomer}>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Customer Code
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.customerCode}
                                onChange={(e) => {
                                    setformData({
                                        ...formData,
                                        customerCode: e.target.value
                                    });
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
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Create Customer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
