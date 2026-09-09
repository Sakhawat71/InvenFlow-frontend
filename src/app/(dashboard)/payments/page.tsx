import { Header, Badge } from '@/components/ui';
import { PaymentForm } from '@/features/finance/forms';
import { invoices, payments } from '@/features/finance/service';
export default async function Page() {
    const [p, i] = await Promise.all([payments(), invoices()]);
    return (
        <>
            <Header title="Payments" description="Record and review invoice settlements." />
            <div className="grid gap-5 lg:grid-cols-3">
                <PaymentForm invoices={i.filter((x) => x.status === 'PENDING')} />
                <section className="card lg:col-span-2">
                    <table className="w-full min-w-[700px] text-sm">
                        <thead className="bg-slate-50 text-left text-xs text-slate-500">
                            <tr>
                                <th className="p-4">Invoice</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {p.map((x) => (
                                <tr className="border-t" key={x.id}>
                                    <td className="p-4 font-semibold">{x.invoice.invoiceNumber}</td>
                                    <td>{x.amount.toLocaleString()}</td>
                                    <td>{x.paymentMethod}</td>
                                    <td>{x.transactionId}</td>
                                    <td>{x.paymentDate}</td>
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
