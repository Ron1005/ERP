"use client"
import { useSearchParams } from "next/navigation"
import { TransactionInvoiceDetail } from "@/constants"
import { useState, useEffect } from "react"

export default function ViewSalesInvoice() {
    const [transactionInvoice, settransactionInvoice] = useState<TransactionInvoiceDetail | null>(null);
    const params = useSearchParams();

    const redirectToPayment = async () => {
        const listofitems = transactionInvoice?.transaction.transactionItems.map((item) => ({
            itemId: item.item.itemId,
            quantity: item.quantity
        }));

        const response = await fetch('http://localhost:8080/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                invoiceId: transactionInvoice?.transactionInvoiceId,
                lineItems: listofitems
            })
        });

        const res = await response.text();
        window.location.href = res; // Use window.location.href for redirection
    }

    const fetchTransactionDetail = async () => {
        const id = params.get('id');
        const response = await fetch(`http://localhost:8080/transactioninvoice/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            const res = await response.json();
            settransactionInvoice(res);
        }
    }

    useEffect(() => {
        fetchTransactionDetail();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">View Sales Invoice</h1>
                
                {transactionInvoice ? (
                    <>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Sales Invoice ID: {transactionInvoice.transactionInvoiceId}</h2>
                            <p className="text-gray-600">Invoice Date: {new Date(transactionInvoice.invoiceDate).toLocaleDateString()}</p>
                            <p className="text-gray-600">Total Value: ${transactionInvoice.totalInvoicePrice.toFixed(2)}</p>
                            <p className={`text-gray-600 ${transactionInvoice.status === 'Payment Completed' ? 'font-bold text-green-600' : 'text-red-600'}`}>
                                Status: {transactionInvoice.status}
                            </p>
                            <p className="text-gray-600">Customer Code: {transactionInvoice.transaction.customer.customerCode}</p>
                            <p className="text-gray-600">Sales Order ID: {transactionInvoice.transaction.transactionId}</p>
                        </div>

                        {/* Transaction Items Table */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Transaction Items</h3>
                            {transactionInvoice.transaction.transactionItems.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {transactionInvoice.transaction.transactionItems.map((item) => (
                                            <tr key={item.transactionItemId}>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.item.itemId}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.item.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.item.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">${item.totalprice.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500">No items found for this invoice.</p>
                            )}
                        </div>

                        {/* Payment Button */}
                        {transactionInvoice.status === "Approved" && (
                            <button
                                onClick={redirectToPayment}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                            >
                                Complete Payment
                            </button>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading invoice details...</h3>
                    </div>
                )}
            </div>
        </div>
    )
}
