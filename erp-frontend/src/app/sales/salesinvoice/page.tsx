"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TransactionInvoice } from "@/constants";
import SalesInvoiceList from "@/components/SalesInvoiceList";

export default function SalesInvoice() {
    const [listofsalesinvoices, setlistofsalesinvoices] = useState<TransactionInvoice[]>([]);

    const fetchSalesInvoices = async () => {
        const response = await fetch('http://localhost:8080/transactioninvoices', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {   
            const res = await response.json();
            setlistofsalesinvoices(res);
        }
    }

    useEffect(() => {
        fetchSalesInvoices();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Sales Invoice Listing</h1>
                </div>

                {/* Sales Invoice List */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    {listofsalesinvoices.length > 0 ? (
                        listofsalesinvoices.map((salesInvoice) => (
                            <SalesInvoiceList salesInvoice={salesInvoice} key={salesInvoice.transactionInvoiceId} />
                        ))
                    ) : (
                        <p className="text-gray-500">No sales invoices found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
