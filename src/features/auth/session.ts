import { cookies } from 'next/headers';
import type { User } from './types';
const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 28800,
};
export async function saveSession(token: string, user: User) {
    const c = await cookies();
    c.set('invenflow_token', token, options);
    c.set('invenflow_user', encodeURIComponent(JSON.stringify(user)), options);
}
export async function userSession(): Promise<User | null> {
    const v = (await cookies()).get('invenflow_user')?.value;
    try {
        return v ? JSON.parse(decodeURIComponent(v)) : null;
    } catch {
        return null;
    }
}
export async function clearSession() {
    const c = await cookies();
    c.delete('invenflow_token');
    c.delete('invenflow_user');
}
