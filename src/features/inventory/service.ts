import { apiFetch } from '@/lib/api';
export type Item = {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    minimumStock: number;
    unit: string;
    category: {
        id?: string;
        name: string;
    };
};
export type Category = {
    id: string;
    name: string;
};
export const inventory = () => apiFetch<Item[]>('/inventory');
export const categories = () => apiFetch<Category[]>('/categories');
export const lowStock = () => apiFetch<Item[]>('/inventory/low-stock');
