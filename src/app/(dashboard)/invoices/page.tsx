import { Header, Badge } from '@/components/ui';
import { InvoiceForm, InvoiceStatus } from '@/features/finance/forms';
import { invoices } from '@/features/finance/service';
import { orders } from '@/features/workflow/service';
export default async function Page() {
    const [i, o] = await Promise.all([invoices(), orders()]);
    return (
        <>
            <Header
                title="Invoices"
                description="Create supplier invoices and monitor due dates."
            />
            <div className="grid gap-5 lg:grid-cols-3">
                <InvoiceForm orders={o} />
                <section className="card lg:col-span-2">
                    <table className="w-full min-w-[800px] text-sm">
                        <thead className="bg-slate-50 text-left text-xs text-slate-500">
                            <tr>
                                <th className="p-4">Invoice</th>
                                <th>PO</th>
                                <th>Supplier</th>
                                <th>Amount</th>
                                <th>Due date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {i.map((x) => (
                                <tr className="border-t" key={x.id}>
                                    <td className="p-4 font-semibold">{x.invoiceNumber}</td>
                                    <td>{x.purchaseOrder.poNumber}</td>
                                    <td>{x.purchaseOrder.supplier.name}</td>
                                    <td>{x.amount.toLocaleString()}</td>
                                    <td>{x.dueDate}</td>
                                    <td>
                                        <Badge value={x.status} />
                                    </td>
                                    <td>
                                        <InvoiceStatus id={x.id} />
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
