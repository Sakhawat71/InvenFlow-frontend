'use server';
import { revalidatePath } from 'next/cache';
import { patch, post } from './service';
import type { State } from '@/features/workflow/actions';
const fail = (e: unknown): State => ({
    error: e instanceof Error ? e.message : 'Request failed',
});
export async function invoiceAction(_: State, f: FormData): Promise<State> {
    try {
        await post('/invoices', {
            purchaseOrderId: String(f.get('purchaseOrderId')),
            invoiceNumber: String(f.get('invoiceNumber')),
            amount: Number(f.get('amount')),
            dueDate: String(f.get('dueDate')),
        });
        revalidatePath('/invoices');
        return {
            success: 'Invoice created',
        };
    } catch (e) {
        return fail(e);
    }
}
export async function invoiceStatus(_: State, f: FormData): Promise<State> {
    try {
        await patch(`/invoices/${String(f.get('id'))}`, {
            status: String(f.get('status')),
        });
        revalidatePath('/invoices');
        return {
            success: 'Invoice status updated',
        };
    } catch (e) {
        return fail(e);
    }
}
export async function paymentAction(_: State, f: FormData): Promise<State> {
    try {
        await post('/payments', {
            invoiceId: String(f.get('invoiceId')),
            amount: Number(f.get('amount')),
            paymentMethod: String(f.get('paymentMethod')),
            transactionId: String(f.get('transactionId')),
        });
        revalidatePath('/payments');
        revalidatePath('/invoices');
        return {
            success: 'Payment recorded',
        };
    } catch (e) {
        return fail(e);
    }
}
