"use client"
import { TransactionInvoice } from "@/constants";
import { useRouter } from "next/navigation";

export default function SalesInvoiceList({ salesInvoice }: { salesInvoice: TransactionInvoice }) {
    const router = useRouter();
        
    const opensalesinvoice = () => {
        router.push(`salesinvoice/viewsalesinvoice?id=${salesInvoice.transactionInvoiceId}`);
    }

    return (
        <div className="border-b border-gray-200 py-4">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">Transaction Invoice ID: {salesInvoice.transactionInvoiceId}</h3>
                    <p className="text-gray-600">Date: {new Date(salesInvoice.invoiceDate).toLocaleDateString()}</p>
                    <p className="text-gray-600">Total Value: ${salesInvoice.totalInvoicePrice.toFixed(2)}</p>
                    <p className={`text-gray-600 ${salesInvoice.status === 'Payment Completed' ? 'font-bold text-green-600' : 'text-red-600'}`}>
                        Status: {salesInvoice.status}
                    </p>
                    <p className="text-gray-600">Sales Order ID: {salesInvoice.transaction.transactionId}</p>
                    <p className="text-gray-600">Customer Code: {salesInvoice.transaction.customer.customerCode}</p>
                </div>
                <button
                    onClick={opensalesinvoice}
                    className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    View Invoice
                </button>
            </div>
        </div>
    )
}
