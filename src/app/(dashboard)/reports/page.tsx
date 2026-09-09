import { Header, Badge } from '@/components/ui';
import { fr, ir, pr } from '@/features/finance/service';
function Stat({ label, value }: { label: string; value: number }) {
    return (
        <article className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value.toLocaleString()}</p>
        </article>
    );
}
export default async function Page() {
    const [i, p, f] = await Promise.all([ir(), pr(), fr()]);
    return (
        <>
            <Header
                title="Reports"
                description="Inventory, procurement and payment performance summary."
            />
            <section>
                <h2 className="mb-3 font-bold">Inventory report</h2>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                    <Stat label="Total items" value={i.totalItems} />
                    <Stat label="Total stock" value={i.totalStockQuantity} />
                    <Stat label="Low stock" value={i.lowStockItems} />
                    <Stat label="Out of stock" value={i.outOfStockItems} />
                    <Stat label="Categories" value={i.categories} />
                </div>
            </section>
            <section className="mt-7">
                <h2 className="mb-3 font-bold">Procurement report</h2>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <Stat label="Total requests" value={p.totalRequests} />
                    <Stat label="Approved requests" value={p.approvedRequests} />
                    <Stat label="Purchase orders" value={p.totalPurchaseOrders} />
                    <Stat label="Suppliers" value={p.totalSuppliers} />
                </div>
                <p className="mt-3 text-sm text-slate-600">
                    Total procurement amount: <b>{p.totalProcurementAmount.toLocaleString()}</b>
                </p>
            </section>
            <section className="mt-7">
                <h2 className="mb-3 font-bold">Payment report</h2>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                    <Stat label="Total invoices" value={f.totalInvoices} />
                    <Stat label="Pending invoices" value={f.pendingInvoices} />
                    <Stat label="Paid invoices" value={f.paidInvoices} />
                    <Stat label="Total paid" value={f.totalPaidAmount} />
                    <Stat label="Outstanding" value={f.outstandingAmount} />
                </div>
            </section>
            <section className="mt-7 grid gap-5 lg:grid-cols-2">
                <article className="card p-5">
                    <h2 className="font-bold">Recent stock movements</h2>
                    <div className="mt-4 space-y-3">
                        {i.recentStockMovements.map((x, n) => (
                            <div key={n} className="flex justify-between border-b pb-3 text-sm">
                                <span>
                                    {x.itemName} · {x.quantity}
                                </span>
                                <Badge value={x.type === 'IN' ? 'COMPLETED' : 'PENDING'} />
                            </div>
                        ))}
                    </div>
                </article>
                <article className="card p-5">
                    <h2 className="font-bold">Recent payments</h2>
                    <div className="mt-4 space-y-3">
                        {f.recentPayments.map((x, n) => (
                            <div key={n} className="flex justify-between border-b pb-3 text-sm">
                                <span>
                                    {x.invoiceNumber} · {x.supplier}
                                </span>
                                <Badge value={x.status} />
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </>
    );
}
