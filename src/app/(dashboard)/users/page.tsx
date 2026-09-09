import { getUsers } from '@/services/userService';

import UserForm from '@/components/users/userForm';

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">User Management</h1>

                <p className="text-slate-500">Create users and assign system roles</p>
            </div>

            <UserForm />

            <div
                className="
                rounded-xl
                border
                bg-white
                p-5
            "
            >
                <table className="w-full">
                    <thead>
                        <tr className="text-left">
                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="py-3">{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
