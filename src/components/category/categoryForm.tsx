'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import toast from 'react-hot-toast';

import { createCategory } from '@/services/categoryService';

export default function CategoryForm() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;

        const data = new FormData(form);

        try {
            setLoading(true);

            await createCategory({
                name: data.get('name') as string,
            });

            toast.success('Category created');

            form.reset();

            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
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
p-5
space-y-4
"
        >
            <h2
                className="
font-semibold
"
            >
                Create Category
            </h2>

            <input
                name="name"

                placeholder="Category name"

                className="input"

                required
            />

            <button
                disabled={loading}

                className="btn"
            >
                {loading ? 'Creating...' : 'Create Category'}
            </button>
        </form>
    );
}
