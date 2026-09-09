'use server';

import { apiFetch } from '@/lib/api';

export type UserRole =
    | 'ADMIN'
    | 'INVENTORY_MANAGER'
    | 'DEPARTMENT_STAFF'
    | 'APPROVER'
    | 'PROCUREMENT_OFFICER'
    | 'FINANCE_OFFICER';

export interface User {
    id: string;

    name: string;

    email: string;

    role: UserRole;

    department?: {
        id: string;
        name: string;
    };

    createdAt: string;
}

export async function getUsers() {
    return apiFetch<User[]>('/users');
}

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    departmentId?: string;
}) {
    return apiFetch<User>('/users', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
