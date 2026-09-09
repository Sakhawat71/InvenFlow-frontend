import { Header, Badge } from '@/components/ui';
import { inventory, lowStock } from '@/features/inventory/service';
export default async function Page() {
    const [i, l] = await Promise.all([inventory(), lowStock()]);
    return (
        <>
            <Header
                title="Inventory management"
                description="Track item availability and low-stock thresholds."
            />
            <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
                <b>Low-stock attention:</b>{' '}
                {l.length ? `${l.length} item(s) require review.` : 'All stock levels are healthy.'}
            </div>
            <section className="card">
                <table className="w-full min-w-[700px] text-sm">
                    <thead className="bg-slate-50 text-left text-xs text-slate-500">
                        <tr>
                            <th className="p-4">Item</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Minimum</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {i.map((x) => (
                            <tr className="border-t" key={x.id}>
                                <td className="p-4 font-semibold">
                                    {x.name} <small className="text-slate-400">{x.sku}</small>
                                </td>
                                <td>{x.category.name}</td>
                                <td>
                                    {x.quantity} {x.unit}
                                </td>
                                <td>
                                    {x.minimumStock} {x.unit}
                                </td>
                                <td>
                                    <Badge
                                        value={
                                            x.quantity <= x.minimumStock ? 'PENDING' : 'IN_STOCK'
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}
