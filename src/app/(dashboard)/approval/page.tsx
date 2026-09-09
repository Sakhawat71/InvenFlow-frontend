import { Header, Badge } from '@/components/ui';
import { ApprovalForm } from '@/features/workflow/forms';
import { approvals } from '@/features/workflow/service';
export default async function Page() {
    const a = await approvals();
    return (
        <>
            <Header
                title="Approval queue"
                description="Approve or reject pending purchase requests."
            />
            <section className="card">
                <table className="w-full min-w-[750px] text-sm">
                    <thead className="bg-slate-50 text-left text-xs text-slate-500">
                        <tr>
                            <th className="p-4">Requested item</th>
                            <th>Requester</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Decision</th>
                        </tr>
                    </thead>
                    <tbody>
                        {a.map((x) => (
                            <tr className="border-t" key={x.id}>
                                <td className="p-4 font-semibold">{x.purchaseRequest.item.name}</td>
                                <td>{x.requester.name}</td>
                                <td>{x.purchaseRequest.quantity}</td>
                                <td>
                                    <Badge value={x.status} />
                                </td>
                                <td>
                                    <ApprovalForm id={x.purchaseRequest.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}
