'use server';
import { revalidatePath } from 'next/cache';
import { patch, post } from './service';
export type State = {
    error?: string;
    success?: string;
};
const fail = (e: unknown): State => ({
    error: e instanceof Error ? e.message : 'Request failed',
});
const done = (path: string, success: string): State => {
    revalidatePath(path);
    return {
        success,
    };
};
export async function requestAction(_: State, f: FormData): Promise<State> {
    try {
        await post('/purchase-requests', {
            itemId: String(f.get('itemId')),
            quantity: Number(f.get('quantity')),
            urgency: String(f.get('urgency')),
            justification: String(f.get('justification')),
        });
        return done('/purchase-request', 'Purchase request created');
    } catch (e) {
        return fail(e);
    }
}
export async function approvalAction(_: State, f: FormData): Promise<State> {
    try {
        await post('/approvals', {
            purchaseRequestId: String(f.get('purchaseRequestId')),
            status: String(f.get('status')),
            comment: String(f.get('comment')),
        });
        return done('/approval', 'Approval decision submitted');
    } catch (e) {
        return fail(e);
    }
}
export async function supplierAction(_: State, f: FormData): Promise<State> {
    try {
        await post('/suppliers', {
            name: String(f.get('name')),
            email: String(f.get('email')),
            phone: String(f.get('phone')),
            address: String(f.get('address')),
        });
        return done('/suppliers', 'Supplier created');
    } catch (e) {
        return fail(e);
    }
}
export async function quotationAction(_: State, f: FormData): Promise<State> {
    try {
        await post('/quotations', {
            supplierId: String(f.get('supplierId')),
            purchaseRequestId: String(f.get('purchaseRequestId')),
            amount: Number(f.get('amount')),
            deliveryTime: String(f.get('deliveryTime')),
            terms: String(f.get('terms')),
        });
        return done('/quotations', 'Quotation created');
    } catch (e) {
        return fail(e);
    }
}
export async function orderAction(_: State, f: FormData): Promise<State> {
    try {
        await post('/purchase-orders', {
            supplierId: String(f.get('supplierId')),
            quotationId: String(f.get('quotationId')),
            items: [
                {
                    inventoryId: String(f.get('inventoryId')),
                    quantity: Number(f.get('quantity')),
                    price: Number(f.get('price')),
                },
            ],
            totalAmount: Number(f.get('totalAmount')),
        });
        return done('/purchase-orders', 'Purchase order created');
    } catch (e) {
        return fail(e);
    }
}
export async function poStatus(_: State, f: FormData): Promise<State> {
    try {
        await patch(`/purchase-orders/${String(f.get('id'))}/status`, {
            status: String(f.get('status')),
        });
        return done('/purchase-orders', 'Order status updated');
    } catch (e) {
        return fail(e);
    }
}
export async function receiptAction(_: State, f: FormData): Promise<State> {
    try {
        await post('/goods-receipts', {
            purchaseOrderId: String(f.get('purchaseOrderId')),
            receivedItems: [
                {
                    inventoryId: String(f.get('inventoryId')),
                    quantity: Number(f.get('quantity')),
                },
            ],
            receivedDate: String(f.get('receivedDate')),
        });
        revalidatePath('/inventory');
        return done('/goods-receipt', 'Goods received and stock updated');
    } catch (e) {
        return fail(e);
    }
}
