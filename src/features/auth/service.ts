import { apiFetch, publicApiFetch } from '@/lib/api';
import type { LoginResponse, User } from './types';
export const login = (input: { email: string; password: string }) =>
    publicApiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(input),
    });
export const me = () => apiFetch<User>('/auth/me');
