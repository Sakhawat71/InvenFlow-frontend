import { apiFetch } from '@/lib/api';
import type { Approval, GR, PO, PR, Quotation, Supplier } from './types';
export const requests = () => apiFetch<PR[]>('/purchase-requests');
export const myRequests = () => apiFetch<PR[]>('/purchase-requests/my');
export const approvals = () => apiFetch<Approval[]>('/approvals/pending');
export const suppliers = () => apiFetch<Supplier[]>('/suppliers');
export const quotations = () => apiFetch<Quotation[]>('/quotations');
export const orders = () => apiFetch<PO[]>('/purchase-orders');
export const receipts = () => apiFetch<GR[]>('/goods-receipts');
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
