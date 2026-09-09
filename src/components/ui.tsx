export function Header({ title, description }: { title: string; description: string }) {
    return (
        <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">InvenFlow</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
    );
}
export function Badge({ value }: { value: string }) {
    const t =
        value === 'APPROVED' ||
        value === 'RECEIVED' ||
        value === 'PAID' ||
        value === 'COMPLETED' ||
        value === 'IN_STOCK'
            ? 'bg-emerald-100 text-emerald-700'
            : value === 'REJECTED' || value === 'CANCELLED' || value === 'OUT_OF_STOCK'
              ? 'bg-red-100 text-red-700'
              : 'bg-amber-100 text-amber-700';
    return (
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${t}`}>
            {value.replaceAll('_', ' ')}
        </span>
    );
}
export function Notice({
    state,
}: {
    state: {
        error?: string;
        success?: string;
    };
}) {
    return (
        <>
            {state.error && <p className="text-sm text-red-600">{state.error}</p>}
            {state.success && <p className="text-sm text-emerald-600">{state.success}</p>}
        </>
    );
}
