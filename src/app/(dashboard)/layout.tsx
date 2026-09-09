import { redirect } from 'next/navigation';
import { userSession } from '@/features/auth/session';
import { AppLayout } from '@/components/layout';
export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await userSession();
    if (!user) redirect('/login');
    return <AppLayout user={user}>{children}</AppLayout>;
}
