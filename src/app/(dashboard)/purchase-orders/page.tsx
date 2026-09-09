import { Header, Badge } from '@/components/ui';
import { OrderForm, POStatus } from '@/features/workflow/forms';
import { orders, quotations, suppliers } from '@/features/workflow/service';
import { inventory } from '@/features/inventory/service';
export default async function Page() {
    const [o, s, q, i] = await Promise.all([orders(), suppliers(), quotations(), inventory()]);
    return (
        <>
            <Header
                title="Purchase orders"
                description="Create purchase orders and manage fulfillment status."
            />
            <div className="grid gap-5 lg:grid-cols-3">
                <OrderForm suppliers={s} quotes={q} items={i} />
                <section className="card lg:col-span-2">
                    <table className="w-full min-w-[700px] text-sm">
                        <thead className="bg-slate-50 text-left text-xs text-slate-500">
                            <tr>
                                <th className="p-4">PO number</th>
                                <th>Supplier</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {o.map((x) => (
                                <tr className="border-t" key={x.id}>
                                    <td className="p-4 font-semibold">{x.poNumber}</td>
                                    <td>{x.supplier.name}</td>
                                    <td>{x.totalAmount.toLocaleString()}</td>
                                    <td>
                                        <Badge value={x.status} />
                                    </td>
                                    <td>
                                        <POStatus id={x.id} />
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
