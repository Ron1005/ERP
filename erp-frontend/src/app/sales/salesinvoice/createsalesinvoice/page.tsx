"use client"
import { TransactionDetail } from "@/constants"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CreateSalesInvoice() {
    const router = useRouter()
    const params = useSearchParams()
    const id = params.get('id')
    const [transaction, settransaction] = useState<TransactionDetail | null>(null);
    const [formData, setformData] = useState({
        invoiceDate: "",
        billingAddress: "",
        comments: ""
    })

    const createInvoice = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8080/transactioninvoice', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                transactionId: transaction?.transactionId,
                transactionInvoiceDate: formData.invoiceDate,
                billingAddress: formData.billingAddress,
                comments: formData.comments
            })
        })
        if (response.status === 200) {
            alert(`Sales Invoice Created Successfully`)
            router.push('/sales/salesinvoice')
        }
    }

    const fetchTransactionDetail = async () => {
        const response = await fetch(`http://localhost:8080/transaction/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            const res = await response.json()
            settransaction(res)
        }
    }

    useEffect(() => {
        fetchTransactionDetail()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Sales Invoice</h1>
                
                <form onSubmit={createInvoice} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Invoice Date:</label>
                        <input 
                            type="date" 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.invoiceDate}
                            onChange={(e) => setformData({ ...formData, invoiceDate: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Billing Address:</label>
                        <input 
                            type="text" 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.billingAddress}
                            onChange={(e) => setformData({ ...formData, billingAddress: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Comments:</label>
                        <input 
                            type="text" 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.comments}
                            onChange={(e) => setformData({ ...formData, comments: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Invoice Price:</label>
                        <span className="border border-gray-300 rounded-md p-2 mt-1 block">${transaction?.totalprice.toFixed(2)}</span>
                    </div>

                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Create Invoice
                    </button>
                </form>

                {/* Transaction Details */}
                {transaction && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800">Transaction Details</h2>
                        <p>Sales Order ID: {transaction.transactionId}</p>
                        <p>Transaction Date: {new Date(transaction.transactionDate).toLocaleDateString()}</p>
                        <p>Transaction Type: {transaction.transactionType}</p>
                        <p>Transaction Price: ${transaction.totalprice.toFixed(2)}</p>
                        <p>Customer Code: {transaction.customer.customerCode}</p>

                        {/* Transaction Items Table */}
                        <h3 className="text-lg font-semibold text-gray-800 mt-4">Transaction Items</h3>
                        {transaction.transactionItems.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200 mt-2">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transaction.transactionItems.map((item) => (
                                        <tr key={item.transactionItemId}>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.item.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.item.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${item.totalprice.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No items found for this transaction.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
