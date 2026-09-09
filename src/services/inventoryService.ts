'use server';

import { cookies } from 'next/headers';
import type { FieldValues } from 'react-hook-form';

type ApiResult<T = unknown> = { success: boolean; message?: string; data?: T };
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const getHeaders = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    return {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };
};

export const getInventoryItems = async (): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/inventory`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load inventory items.',
        };
    }
};

export const getInventoryItemById = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/inventory/${id}`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load the inventory item.',
        };
    }
};

export const createInventoryItem = async (itemData: FieldValues): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/inventory`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(itemData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to create inventory item.',
        };
    }
};

export const updateInventoryItem = async (
    id: string,
    itemData: FieldValues,
): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/inventory/${id}`, {
            method: 'PATCH',
            headers: await getHeaders(),
            body: JSON.stringify(itemData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to update inventory item.',
        };
    }
};

export const deleteInventoryItem = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/inventory/${id}`, {
            method: 'DELETE',
            headers: await getHeaders(),
        });
        if (response.status === 204) return { success: true };
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to delete inventory item.',
        };
    }
};
