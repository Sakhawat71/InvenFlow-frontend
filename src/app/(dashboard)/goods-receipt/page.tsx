import { Header } from '@/components/ui';
import { ReceiptForm } from '@/features/workflow/forms';
import { orders, receipts } from '@/features/workflow/service';
import { inventory } from '@/features/inventory/service';
export default async function Page() {
    const [r, o, i] = await Promise.all([receipts(), orders(), inventory()]);
    return (
        <>
            <Header
                title="Goods receipt"
                description="Receive ordered goods and update inventory stock."
            />
            <div className="grid gap-5 lg:grid-cols-3">
                <ReceiptForm orders={o} items={i} />
                <section className="card lg:col-span-2">
                    <table className="w-full min-w-[650px] text-sm">
                        <thead className="bg-slate-50 text-left text-xs text-slate-500">
                            <tr>
                                <th className="p-4">Purchase order</th>
                                <th>Received items</th>
                                <th>Received date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {r.map((x) => (
                                <tr className="border-t" key={x.id}>
                                    <td className="p-4 font-semibold">
                                        {x?.purchaseOrder?.poNumber}
                                    </td>
                                    <td>
                                        {x?.receivedItems
                                            .map((y) => `${y?.itemName} x ${y?.quantity}`)
                                            .join(', ')}
                                    </td>
                                    <td>{x?.receivedDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
