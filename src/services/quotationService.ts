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

export const getQuotations = async (): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/quotation`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load quotations.',
        };
    }
};

export const getQuotationById = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/quotation/${id}`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load quotation.',
        };
    }
};

export const createQuotation = async (quotationData: FieldValues): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/quotation`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(quotationData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to create quotation.',
        };
    }
};

export const updateQuotation = async (
    id: string,
    quotationData: FieldValues,
): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/quotation/${id}`, {
            method: 'PATCH',
            headers: await getHeaders(),
            body: JSON.stringify(quotationData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to update quotation.',
        };
    }
};

export const deleteQuotation = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/quotation/${id}`, {
            method: 'DELETE',
            headers: await getHeaders(),
        });
        if (response.status === 204) return { success: true };
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to delete quotation.',
        };
    }
};
