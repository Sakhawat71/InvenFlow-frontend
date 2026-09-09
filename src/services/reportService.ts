'use server';

import { cookies } from 'next/headers';

type ApiResult<T = unknown> = { success: boolean; message?: string; data?: T };
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const getHeaders = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    return {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };
};

export const getReports = async (): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/report`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load reports.',
        };
    }
};

export const getReportByType = async (reportType: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/report/${reportType}`, {
            headers: await getHeaders(),
            cache: 'no-store',
        });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to load report.',
        };
    }
};
