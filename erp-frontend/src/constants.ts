export interface Item  {
    itemId:number,
    name:string,
    description:string,
    price:number,
    quantity:number
}

export interface Customer {
    customerId:number,
    customerCode:string
}

export interface Transaction{
    transactionId: number,
    transactionType: string,
    transactionDate: string,
    status:string,
    totalprice: number
}

export interface TransactionDetail{
    transactionId: number,
    transactionType: string,
    transactionDate: string,
    totalprice: number,
    status:string,
    customer:Customer,
    transactionItems:any[]
}

export interface TransactionInvoice{
    transactionInvoiceId:number,
    invoiceDate:string,
    totalInvoicePrice:number,
    status:string,
    transaction:any
}

export interface TransactionInvoiceDetail{
    transactionInvoiceId:number,
    invoiceDate:string,
    billingAddress:string,
    totalInvoicePrice:number,
    comments:string,
    status:string,
    transaction:TransactionDetail
}