import { cookies } from 'next/headers';

const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000/api';

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
    errors?: unknown;
};

export class ApiError extends Error {
    status: number;

    details: unknown;

    constructor(message: string, status: number, details?: unknown) {
        super(message);

        this.name = 'ApiError';

        this.status = status;

        this.details = details;
    }
}

async function handleResponse<T>(res: Response): Promise<T> {
    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
        throw new ApiError(
            json?.message ?? 'Request failed',

            res.status,

            json?.errors ?? json,
        );
    }

    return json.data;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = (await cookies()).get('invenflow_token')?.value;

    const headers = new Headers(init.headers);

    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    let response: Response;

    try {
        response = await fetch(
            `${base}${path}`,

            {
                ...init,

                headers,

                cache: 'no-store',
            },
        );
    } catch (error) {
        throw new ApiError(
            'Server is unavailable. Please try again.',

            503,

            error,
        );
    }

    return handleResponse<T>(response);
}

export async function publicApiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers);

    headers.set('Content-Type', 'application/json');

    let response: Response;

    try {
        response = await fetch(
            `${base}${path}`,

            {
                ...init,

                headers,

                cache: 'no-store',
            },
        );
    } catch (error) {
        throw new ApiError(
            'Server is unavailable. Please try again.',

            503,

            error,
        );
    }

    return handleResponse<T>(response);
}
