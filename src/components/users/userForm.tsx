'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { createUser } from '@/services/userService';

const roles = [
    'ADMIN',

    'INVENTORY_MANAGER',

    'DEPARTMENT_STAFF',

    'APPROVER',

    'PROCUREMENT_OFFICER',

    'FINANCE_OFFICER',
];

export default function UserForm() {
    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setLoading(true);

        try {
            const form = new FormData(e.currentTarget);
            await createUser({
                name: form.get('name') as string,

                email: form.get('email') as string,

                password: form.get('password') as string,
                role: form.get('role') as any,
            });

            toast.success('User created successfully');
            // e.currentTarget.reset();
        } catch (error: any) {
            toast.error(error.message ?? 'Failed to create user');
        } finally {
            setLoading(false);
        }
        form.reset();
    }

    return (
        <form onSubmit={submit} className="bg-white border rounded-xl p-5 space-y-4">
            <h2 className="font-bold">Create New User</h2>

            <input name="name" placeholder="Name" className="input" />

            <input name="email" placeholder="Email" className="input" />

            <input name="password" type="password" placeholder="Password" className="input" />

            <select name="role" className="input">
                {roles.map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>

            <button disabled={loading} className="btn">
                {loading ? 'Creating...' : 'Create User'}
            </button>
        </form>
    );
}
