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

export const getGoodsReceipts = async (): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/goods-receipt`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load goods receipts.',
        };
    }
};

export const getGoodsReceiptById = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/goods-receipt/${id}`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load goods receipt.',
        };
    }
};

export const createGoodsReceipt = async (receiptData: FieldValues): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/goods-receipt`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(receiptData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to create goods receipt.',
        };
    }
};

export const updateGoodsReceipt = async (
    id: string,
    receiptData: FieldValues,
): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/goods-receipt/${id}`, {
            method: 'PATCH',
            headers: await getHeaders(),
            body: JSON.stringify(receiptData),
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to update goods receipt.',
        };
    }
};
