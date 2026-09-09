import { apiFetch } from '@/lib/api';
export type Invoice = {
    id: string;
    invoiceNumber: string;
    purchaseOrder: {
        id: string;
        poNumber: string;
        supplier: {
            id: string;
            name: string;
        };
    };
    amount: number;
    dueDate: string;
    status: string;
};
export type Payment = {
    id: string;
    invoice: {
        id: string;
        invoiceNumber: string;
    };
    amount: number;
    paymentMethod: string;
    transactionId: string;
    paymentDate: string;
    status: string;
};
export type IR = {
    totalItems: number;
    totalStockQuantity: number;
    lowStockItems: number;
    outOfStockItems: number;
    categories: number;
    recentStockMovements: {
        itemName: string;
        type: string;
        quantity: number;
        date: string;
    }[];
};
export type PR = {
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    totalPurchaseOrders: number;
    completedPurchaseOrders: number;
    totalSuppliers: number;
    totalProcurementAmount: number;
    recentPurchaseOrders: {
        poNumber: string;
        supplier: string;
        amount: number;
        status: string;
    }[];
};
export type FR = {
    totalInvoices: number;
    pendingInvoices: number;
    paidInvoices: number;
    totalInvoiceAmount: number;
    totalPaidAmount: number;
    outstandingAmount: number;
    recentPayments: {
        invoiceNumber: string;
        supplier: string;
        amount: number;
        paymentMethod: string;
        status: string;
        paymentDate: string;
    }[];
};
export const invoices = () => apiFetch<Invoice[]>('/invoices');
export const payments = () => apiFetch<Payment[]>('/payments');
export const ir = () => apiFetch<IR>('/reports/inventory');
export const pr = () => apiFetch<PR>('/reports/procurement');
export const fr = () => apiFetch<FR>('/reports/payment');
export const post = (path: string, body: unknown) =>
    apiFetch<unknown>(path, {
        method: 'POST',
        body: JSON.stringify(body),
    });
export const patch = (path: string, body: unknown) =>
    apiFetch<unknown>(path, {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
