'use client';
import { useActionState } from 'react';
import { invoiceAction, invoiceStatus, paymentAction } from './actions';
import { Notice } from '@/components/ui';
import type { State } from '@/features/workflow/actions';
const initial: State = {};
function Box({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="font-bold">{title}</h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}
export function InvoiceForm({
    orders,
}: {
    orders: {
        id: string;
        poNumber: string;
    }[];
}) {
    const [s, a, p] = useActionState(invoiceAction, initial);
    return (
        <Box title="Create invoice">
            <form action={a} className="grid gap-3">
                <select name="purchaseOrderId" className="input" required>
                    <option value="">Purchase order</option>
                    {orders.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.poNumber}
                        </option>
                    ))}
                </select>
                <input
                    name="invoiceNumber"
                    className="input"
                    placeholder="Invoice number"
                    required
                />
                <input
                    name="amount"
                    type="number"
                    min="0"
                    className="input"
                    placeholder="Invoice amount"
                    required
                />
                <input name="dueDate" type="date" className="input" required />
                <Notice state={s} />
                <button disabled={p} className="btn">
                    Create invoice
                </button>
            </form>
        </Box>
    );
}
export function InvoiceStatus({ id }: { id: string }) {
    const [s, a, p] = useActionState(invoiceStatus, initial);
    return (
        <form action={a} className="flex gap-2">
            <input name="id" type="hidden" value={id} />
            <select name="status" className="rounded-lg border px-2 text-xs">
                <option>PAID</option>
                <option>CANCELLED</option>
            </select>
            <button disabled={p} className="rounded-lg bg-slate-900 px-2 text-xs text-white">
                Update
            </button>
            <Notice state={s} />
        </form>
    );
}
export function PaymentForm({
    invoices,
}: {
    invoices: {
        id: string;
        invoiceNumber: string;
        amount: number;
    }[];
}) {
    const [s, a, p] = useActionState(paymentAction, initial);
    return (
        <Box title="Record payment">
            <form action={a} className="grid gap-3">
                <select name="invoiceId" className="input" required>
                    <option value="">Invoice</option>
                    {invoices.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.invoiceNumber} · {x.amount}
                        </option>
                    ))}
                </select>
                <input
                    name="amount"
                    type="number"
                    min="0"
                    className="input"
                    placeholder="Payment amount"
                    required
                />
                <select name="paymentMethod" className="input">
                    <option>BANK_TRANSFER</option>
                    <option>CASH</option>
                    <option>CHEQUE</option>
                    <option>MOBILE_BANKING</option>
                </select>
                <input
                    name="transactionId"
                    className="input"
                    placeholder="Transaction ID"
                    required
                />
                <Notice state={s} />
                <button disabled={p} className="btn">
                    Record payment
                </button>
            </form>
        </Box>
    );
}
