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

export const getPayments = async (): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/payment`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load payments.',
        };
    }
};

export const getPaymentById = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/payment/${id}`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load payment.',
        };
    }
};

export const createPayment = async (paymentData: FieldValues): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/payment`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(paymentData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to create payment.',
        };
    }
};

export const updatePayment = async (id: string, paymentData: FieldValues): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/payment/${id}`, {
            method: 'PATCH',
            headers: await getHeaders(),
            body: JSON.stringify(paymentData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to update payment.',
        };
    }
};

export const deletePayment = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/payment/${id}`, {
            method: 'DELETE',
            headers: await getHeaders(),
        });
        if (response.status === 204) return { success: true };
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to delete payment.',
        };
    }
};
