import { Header, Badge } from '@/components/ui';
import { RequestForm } from '@/features/workflow/forms';
import { myRequests } from '@/features/workflow/service';
import { inventory } from '@/features/inventory/service';
export default async function Page() {
    const [r, i] = await Promise.all([myRequests(), inventory()]);
    return (
        <>
            <Header
                title="My purchase requests"
                description="Create requests and track their procurement status."
            />
            <div className="grid gap-5 lg:grid-cols-3">
                <RequestForm items={i} />
                <section className="card lg:col-span-2">
                    <table className="w-full min-w-[600px] text-sm">
                        <thead className="bg-slate-50 text-left text-xs text-slate-500">
                            <tr>
                                <th className="p-4">Item</th>
                                <th>Quantity</th>
                                <th>Urgency</th>
                                <th>Status</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {r.map((x) => (
                                <tr className="border-t" key={x.id}>
                                    <td className="p-4 font-semibold">{x.item.name}</td>
                                    <td>{x.quantity}</td>
                                    <td>{x.urgency}</td>
                                    <td>
                                        <Badge value={x.status} />
                                    </td>
                                    <td>{new Date(x.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
