'use server';
import { redirect } from 'next/navigation';
import { login } from './service';
import { clearSession, saveSession } from './session';
export type State = {
    error?: string;
    success?: string;
};
export async function loginAction(_: State, f: FormData): Promise<State> {
    try {
        const email = String(f.get('email'));
        const password = String(f.get('password'));
        if (!email || !password)
            return {
                error: 'Email and password are required',
            };
        const data = await login({
            email,
            password,
        });
        await saveSession(data.token, data.user);
    } catch (e) {
        return {
            error: e instanceof Error ? e.message : 'Login failed',
        };
    }
    redirect('/dashboard');
}
export async function logoutAction() {
    await clearSession();
    redirect('/login');
}
