import { Header, Badge } from '@/components/ui';
import { QuoteForm } from '@/features/workflow/forms';
import { quotations, requests, suppliers } from '@/features/workflow/service';
export default async function Page() {
    const [q, s, r] = await Promise.all([quotations(), suppliers(), requests()]);
    return (
        <>
            <Header
                title="Quotation management"
                description="Record and compare supplier offers."
            />
            <div className="grid gap-5 lg:grid-cols-3">
                <QuoteForm suppliers={s} requests={r} />
                <section className="card lg:col-span-2">
                    <table className="w-full min-w-[650px] text-sm">
                        <thead className="bg-slate-50 text-left text-xs text-slate-500">
                            <tr>
                                <th className="p-4">Supplier</th>
                                <th>Request</th>
                                <th>Amount</th>
                                <th>Delivery</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {q.map((x) => (
                                <tr className="border-t" key={x.id}>
                                    <td className="p-4 font-semibold">{x.supplier.name}</td>
                                    <td>{x.purchaseRequest.id}</td>
                                    <td>{x.amount.toLocaleString()}</td>
                                    <td>{x.deliveryTime}</td>
                                    <td>
                                        <Badge value={x.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
