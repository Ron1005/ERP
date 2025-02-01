"use client"
import TransactionItemForm from "@/components/TransactionItemForm"
import { useEffect, useState } from "react"
import { Customer } from "@/constants"
import { Item } from "@/constants"
import { useRouter } from "next/navigation"

export default function CreateSalesOrder() {
    const router = useRouter()
    const [formData, setformData] = useState({
        transactionType: "",
        transactionDate: "",
        customerCode: ""
    })
    const [itemlist, setitemlist] = useState<any[]>([])
    const [customerselect, setcustomerselect] = useState<Customer[]>([]);
    const [itemsselect, setitemsselect] = useState<Item[]>([]);

    const fillSelects = async () => {
        const response = await fetch('http://localhost:8080/customers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            const res = await response.json();
            setcustomerselect(res);
        }

        const responseitems = await fetch('http://localhost:8080/items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (responseitems.status === 200) {
            const resitems = await responseitems.json();
            setitemsselect(resitems);
        }
    }

    const addItemToList = (item: any) => {
        setitemlist([...itemlist, item]);
    }

    const createSalesOrder = async () => {
        const transactionItems = itemlist.map((item) => ({
            name: item.name,
            quantity: parseInt(item.orderquantity)
        }));

        const finalData = { ...formData, transactionItems };
        
        const response = await fetch('http://localhost:8080/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
        });
        
        if (response.status === 200) {
            alert(`Sales Order Created Successfully`);
            router.back();
        }
    }

    useEffect(() => {
        fillSelects();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Sales Order</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
                        <select required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.transactionType}
                            onChange={(e) => setformData({ ...formData, transactionType: e.target.value })}
                        >
                            <option value="">--Select Transaction Type--</option>
                            <option value="Sales Order">Sales Order</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Transaction Date</label>
                        <input type="date" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.transactionDate}
                            onChange={(e) => setformData({ ...formData, transactionDate: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer Code</label>
                        <select required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.customerCode}
                            onChange={(e) => setformData({ ...formData, customerCode: e.target.value })}
                        >
                            <option value="">--Select Customer Code--</option>
                            {customerselect.map((customer) => (
                                <option value={customer.customerCode} key={customer.customerId}>{customer.customerCode}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-gray-800">Enter Transaction Items</h2>
                    </div>

                    {/* Display added items */}
                    {itemlist.length > 0 && (
                        <div className="bg-gray-100 rounded-md p-4 mb-4">
                            {itemlist.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b border-gray-200 py-2">
                                    <span>{item.name} - Quantity: {item.orderquantity}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Transaction Item Form */}
                    <TransactionItemForm itemsselect={itemsselect} addItemToList={addItemToList} />

                    {/* Create Sales Order Button */}
                    <button
                        type="button"
                        onClick={createSalesOrder}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Create Sales Order
                    </button>
                </form>
            </div>
        </div>
    )
}
