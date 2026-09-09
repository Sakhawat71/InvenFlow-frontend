import { dashboard } from '@/features/dashboard/service';
import { Header } from '@/components/ui';

export default async function Page() {
    const d = await dashboard();
    const metrics = [
        { label: 'Total items', value: d.totalItems },
        { label: 'Low-stock alerts', value: d.lowStockItems },
        { label: 'Pending requests', value: d.pendingRequests },
        { label: 'Purchase orders', value: d.purchaseOrders },
        { label: 'Suppliers', value: d.totalSuppliers },
        { label: 'Pending payments', value: d.pendingPayments },
    ];

    return (
        <>
            <Header
                title="Operations dashboard"
                description="Live inventory, procurement and finance overview."
            />
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {metrics.map((item) => (
                    <article key={item.label} className="rounded-2xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">{item.label}</p>
                        <p className="mt-5 text-3xl font-bold">{item?.value?.toLocaleString()}</p>
                        <p className="mt-2 text-xs text-slate-400">Live operational summary</p>
                    </article>
                ))}
            </section>
        </>
    );
}
