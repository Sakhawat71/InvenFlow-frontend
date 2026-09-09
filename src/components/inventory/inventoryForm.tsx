'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { createInventory } from '@/services/inventoryService';

import { Category } from '@/services/categoryService';

interface InventoryFormProps {
    categories: Category[];
}

export default function InventoryForm({ categories }: InventoryFormProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        try {
            setLoading(true);

            await createInventory({
                name: formData.get('name') as string,

                sku: formData.get('sku') as string,

                description: formData.get('description') as string,

                categoryId: formData.get('categoryId') as string,

                quantity: Number(formData.get('quantity')),

                minimumStock: Number(formData.get('minimumStock')),
            });

            toast.success('Inventory item created successfully');

            form.reset();

            router.refresh();
        } catch (error: any) {
            toast.error(error.message ?? 'Failed to create item');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={submit}
            className="
                rounded-xl
                border
                bg-white
                p-6
                space-y-4
            "
        >
            <h2
                className="
                text-lg
                font-semibold
            "
            >
                Add Inventory Item
            </h2>

            <input
                name="name"

                placeholder="Item name"

                className="input"

                required
            />

            <input
                name="sku"

                placeholder="SKU"

                className="input"

                required
            />

            <input
                name="description"

                placeholder="Description"

                className="input"
            />

            <select
                name="categoryId"

                className="input"

                required
            >
                <option value="">Select Category</option>

                {categories.map((category) => (
                    <option
                        key={category.id}

                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>

            <input
                name="quantity"

                type="number"

                placeholder="Quantity"

                className="input"

                min="0"

                required
            />

            <input
                name="minimumStock"

                type="number"

                placeholder="Minimum Stock"

                className="input"

                min="0"

                required
            />

            <button
                disabled={loading}

                className="btn"
            >
                {loading ? 'Creating...' : 'Create Item'}
            </button>
        </form>
    );
}
