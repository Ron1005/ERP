"use client"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function InvoiceSuccess() {
    const params = useSearchParams()
    const router = useRouter()

    const routeToSalesInvoiceList = () => {
        router.push('/sales/salesinvoice')
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 border border-gray-100 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
                <p className="text-gray-700 mb-4">
                    Payment for Sales Invoice ID <span className="font-semibold">{params.get('invoiceId')}</span> has been completed successfully.
                </p>
                <button
                    onClick={routeToSalesInvoiceList}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    View Sales Invoices
                </button>
            </div>
        </div>
    )
}
