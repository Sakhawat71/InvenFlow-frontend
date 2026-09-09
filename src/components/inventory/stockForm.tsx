'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { createStockTransaction } from '@/services/stockService';

export default function StockForm({ itemId }: { itemId: string }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;

        const data = new FormData(form);

        try {
            setLoading(true);

            await createStockTransaction({
                itemId,

                type: data.get('type') as 'IN' | 'OUT',

                quantity: Number(data.get('quantity')),
            });

            toast.success('Stock updated successfully');

            form.reset();

            router.refresh();
        } catch (error: any) {
            console.error(error);

            toast.error(error.message ?? 'Stock update failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={submit}
            className="
                space-y-3
                rounded-xl
                border
                bg-white
                p-4
            "
        >
            <h3
                className="
                font-semibold
            "
            >
                Stock Transaction
            </h3>

            <select name="type" className="input">
                <option value="STOCK_IN">Stock IN</option>

                <option value="STOCK_OUT">Stock OUT</option>
            </select>

            <input
                name="quantity"

                type="number"

                placeholder="Quantity"

                className="input"

                required
            />

            <button disabled={loading} className="btn">
                {loading ? 'Updating...' : 'Update Stock'}
            </button>
        </form>
    );
}
