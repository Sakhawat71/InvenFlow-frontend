'use server';

import { cookies } from 'next/headers';
import type { FieldValues } from 'react-hook-form';
import { apiFetch } from '@/lib/api';

type ApiResult<T = unknown> = { success: boolean; message?: string; data?: T };
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const getHeaders = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    return {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };
};

export interface Category {
    id: string;

    name: string;
}

export interface Category {
    id: string;

    name: string;

    createdAt: string;
}

export async function getCategories() {
    return apiFetch<Category[]>('/categories');
}

export async function createCategory(data: { name: string }) {
    return apiFetch('/categories', {
        method: 'POST',

        body: JSON.stringify(data),
    });
}

export async function deleteCategory(id: string) {
    return apiFetch(`/categories/${id}`, {
        method: 'DELETE',
    });
}

export const getCategorie = async (): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/category`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load categories.',
        };
    }
};

export const getCategoryById = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/category/${id}`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load the category.',
        };
    }
};

export const createCategorys = async (categoryData: FieldValues): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/category`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(categoryData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to create category.',
        };
    }
};

export const updateCategory = async (id: string, categoryData: FieldValues): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/category/${id}`, {
            method: 'PATCH',
            headers: await getHeaders(),
            body: JSON.stringify(categoryData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to update category.',
        };
    }
};

export const deleteCategorys = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/category/${id}`, {
            method: 'DELETE',
            headers: await getHeaders(),
        });
        if (response.status === 204) return { success: true };
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to delete category.',
        };
    }
};
