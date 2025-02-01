"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { TransactionDetail } from "@/constants"
import { useEffect, useState } from "react"

export default function ViewSalesOrder() {
    const [transaction, setTransaction] = useState<TransactionDetail | null>(null);
    const params = useSearchParams();
    const router = useRouter();

    const convertToInvoice = () => {
        router.push(`/sales/salesinvoice/createsalesinvoice?id=${transaction?.transactionId}`);
    }

    const fetchTransactionDetail = async () => {
        const id = params.get('id');
        const response = await fetch(`http://localhost:8080/transaction/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            const res = await response.json();
            setTransaction(res);
        }
    }

    useEffect(() => {
        fetchTransactionDetail();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Sales Order Details
                    </h1>
                </div>

                {/* Transaction Details */}
                {transaction ? (
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Sales Order ID: {transaction.transactionId}</h2>
                            <p className="text-gray-600">Transaction Date: {new Date(transaction.transactionDate).toLocaleDateString()}</p>
                            <p className="text-gray-600">Transaction Type: {transaction.transactionType}</p>
                            <p className="text-gray-600">Total Price: ${transaction.totalprice.toFixed(2)}</p>
                            <p className="text-gray-600">Status: {transaction.status}</p>
                            <p className="text-gray-600">Customer Code: {transaction.customer.customerCode}</p>
                        </div>

                        {/* Transaction Items Table */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Transaction Items</h3>
                            {transaction.transactionItems.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
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

                        {/* Convert to Invoice Button */}
                        {transaction.status === "Approved" && (
                            <button
                                onClick={convertToInvoice}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                            >
                                Convert To Invoice
                            </button>
                        )}
                    </div>
                ) : (
                    // Loading or Empty State
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading transaction details...</h3>
                    </div>
                )}
            </div>
        </div>
    )
}
