import { apiFetch } from '@/lib/api';
export type Dashboard = {
    totalItems: number;
    lowStockItems: number;
    totalSuppliers: number;
    pendingRequests: number;
    purchaseOrders: number;
    pendingPayments: number;
};
export const dashboard = () => apiFetch<Dashboard>('/dashboard');
