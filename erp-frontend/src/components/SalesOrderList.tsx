"use client"
import { Transaction } from "@/constants";
import { useRouter } from "next/navigation";

export default function SalesOrderList({ salesorder }: { salesorder: Transaction }) {
    const router = useRouter();
    
    const opensalesorder = () => {
        router.push(`salesorder/viewsalesorder?id=${salesorder.transactionId}`)
    }

    return (
        <div className="border-b border-gray-200 py-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Transaction ID: {salesorder.transactionId}</h3>
                    <p className="text-gray-600">Type: {salesorder.transactionType}</p>
                    <p className="text-gray-600">Date: {new Date(salesorder.transactionDate).toLocaleDateString()}</p>
                    <p className={`text-gray-600 ${salesorder.status === 'Approved' ? 'font-bold text-green-600' : 'text-red-600'}`}>
                        Status: {salesorder.status}
                    </p>
                    <p className="text-gray-600">Total Price: ${salesorder.totalprice.toFixed(2)}</p>
                </div>
                <button
                    onClick={opensalesorder}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    View Transaction
                </button>
            </div>
        </div>
    )
}
