'use client';
import { useActionState } from 'react';
import {
    approvalAction,
    orderAction,
    poStatus,
    quotationAction,
    receiptAction,
    requestAction,
    supplierAction,
} from './actions';
import { Notice } from '@/components/ui';
import type { State } from './actions';
const initial: State = {};
function Box({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="font-bold">{title}</h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}
export function RequestForm({
    items,
}: {
    items: {
        id: string;
        name: string;
    }[];
}) {
    const [s, a, p] = useActionState(requestAction, initial);
    return (
        <Box title="Create purchase request">
            <form action={a} className="grid gap-3">
                <select name="itemId" className="input" required>
                    <option value="">Select item</option>
                    {items.map((i) => (
                        <option key={i.id} value={i.id}>
                            {i.name}
                        </option>
                    ))}
                </select>
                <input
                    name="quantity"
                    type="number"
                    min="1"
                    className="input"
                    placeholder="Quantity"
                    required
                />
                <select name="urgency" className="input">
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                </select>
                <textarea
                    name="justification"
                    className="input"
                    placeholder="Business justification"
                    required
                />
                <Notice state={s} />
                <button disabled={p} className="btn">
                    Create request
                </button>
            </form>
        </Box>
    );
}
export function ApprovalForm({ id }: { id: string }) {
    const [s, a, p] = useActionState(approvalAction, initial);
    return (
        <form action={a} className="flex flex-wrap gap-2">
            <input name="purchaseRequestId" type="hidden" value={id} />
            <input
                name="comment"
                className="rounded-lg border px-2 text-xs"
                placeholder="Comment"
            />
            <button
                disabled={p}
                name="status"
                value="APPROVED"
                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white"
            >
                Approve
            </button>
            <button
                disabled={p}
                name="status"
                value="REJECTED"
                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white"
            >
                Reject
            </button>
            <Notice state={s} />
        </form>
    );
}
export function SupplierForm() {
    const [s, a, p] = useActionState(supplierAction, initial);
    return (
        <Box title="Add supplier">
            <form action={a} className="grid gap-3">
                <input name="name" className="input" placeholder="Supplier name" required />
                <input name="email" type="email" className="input" placeholder="Email" />
                <input name="phone" className="input" placeholder="Phone" />
                <input name="address" className="input" placeholder="Address" />
                <Notice state={s} />
                <button disabled={p} className="btn">
                    Save supplier
                </button>
            </form>
        </Box>
    );
}
export function QuoteForm({
    suppliers,
    requests,
}: {
    suppliers: {
        id: string;
        name: string;
    }[];
    requests: {
        id: string;
        item: {
            name: string;
        };
    }[];
}) {
    const [s, a, p] = useActionState(quotationAction, initial);
    return (
        <Box title="Create quotation">
            <form action={a} className="grid gap-3">
                <select name="supplierId" className="input" required>
                    <option value="">Supplier</option>
                    {suppliers.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.name}
                        </option>
                    ))}
                </select>
                <select name="purchaseRequestId" className="input" required>
                    <option value="">Purchase request</option>
                    {requests.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.item.name}
                        </option>
                    ))}
                </select>
                <input
                    name="amount"
                    type="number"
                    min="0"
                    className="input"
                    placeholder="Amount"
                    required
                />
                <input name="deliveryTime" className="input" placeholder="Delivery time" />
                <textarea name="terms" className="input" placeholder="Terms" />
                <Notice state={s} />
                <button disabled={p} className="btn">
                    Save quotation
                </button>
            </form>
        </Box>
    );
}
export function OrderForm({
    suppliers,
    quotes,
    items,
}: {
    suppliers: {
        id: string;
        name: string;
    }[];
    quotes: {
        id: string;
    }[];
    items: {
        id: string;
        name: string;
    }[];
}) {
    const [s, a, p] = useActionState(orderAction, initial);
    return (
        <Box title="Create purchase order">
            <form action={a} className="grid gap-3">
                <select name="supplierId" className="input" required>
                    <option value="">Supplier</option>
                    {suppliers.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.name}
                        </option>
                    ))}
                </select>
                <select name="quotationId" className="input" required>
                    <option value="">Quotation</option>
                    {quotes.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.id}
                        </option>
                    ))}
                </select>
                <select name="inventoryId" className="input" required>
                    <option value="">Inventory item</option>
                    {items.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.name}
                        </option>
                    ))}
                </select>
                <input
                    name="quantity"
                    type="number"
                    min="1"
                    className="input"
                    placeholder="Quantity"
                    required
                />
                <input
                    name="price"
                    type="number"
                    min="0"
                    className="input"
                    placeholder="Unit price"
                    required
                />
                <input
                    name="totalAmount"
                    type="number"
                    min="0"
                    className="input"
                    placeholder="Total amount"
                    required
                />
                <Notice state={s} />
                <button disabled={p} className="btn">
                    Create purchase order
                </button>
            </form>
        </Box>
    );
}
export function POStatus({ id }: { id: string }) {
    const [s, a, p] = useActionState(poStatus, initial);
    return (
        <form action={a} className="flex gap-2">
            <input name="id" type="hidden" value={id} />
            <select name="status" className="rounded-lg border px-2 text-xs">
                <option>APPROVED</option>
                <option>RECEIVED</option>
                <option>CANCELLED</option>
            </select>
            <button disabled={p} className="rounded-lg bg-slate-900 px-2 text-xs text-white">
                Update
            </button>
            <Notice state={s} />
        </form>
    );
}
export function ReceiptForm({
    orders,
    items,
}: {
    orders: {
        id: string;
        poNumber: string;
    }[];
    items: {
        id: string;
        name: string;
    }[];
}) {
    const [s, a, p] = useActionState(receiptAction, initial);
    return (
        <Box title="Receive goods">
            <form action={a} className="grid gap-3">
                <select name="purchaseOrderId" className="input" required>
                    <option value="">Purchase order</option>
                    {orders.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.poNumber}
                        </option>
                    ))}
                </select>
                <select name="inventoryId" className="input" required>
                    <option value="">Inventory item</option>
                    {items.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.name}
                        </option>
                    ))}
                </select>
                <input
                    name="quantity"
                    type="number"
                    min="1"
                    className="input"
                    placeholder="Received quantity"
                    required
                />
                <input name="receivedDate" type="date" className="input" required />
                <Notice state={s} />
                <button disabled={p} className="btn">
                    Record goods receipt
                </button>
            </form>
        </Box>
    );
}
