import { Header } from '@/components/ui';
import { SupplierForm } from '@/features/workflow/forms';
import { suppliers } from '@/features/workflow/service';
export default async function Page() {
    const s = await suppliers();
    return (
        <>
            <Header
                title="Supplier management"
                description="Maintain supplier information for procurement."
            />
            <div className="grid gap-5 lg:grid-cols-3">
                <SupplierForm />
                <section className="card lg:col-span-2">
                    <table className="w-full min-w-[600px] text-sm">
                        <thead className="bg-slate-50 text-left text-xs text-slate-500">
                            <tr>
                                <th className="p-4">Supplier</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {s.map((x) => (
                                <tr className="border-t" key={x.id}>
                                    <td className="p-4 font-semibold">{x.name}</td>
                                    <td>{x.email}</td>
                                    <td>{x.phone}</td>
                                    <td>{x.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
