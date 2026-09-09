import Link from 'next/link';
import {
    Boxes,
    ClipboardList,
    LayoutDashboard,
    PackageSearch,
    ReceiptText,
    ShoppingCart,
    Truck,
    Users,
    UserRound,
    LogOut,
    CreditCard,
    BarChart3,
    FolderTree,
    Building2,
    type LucideIcon,
} from 'lucide-react';
import type { User } from '@/features/auth/types';
import { logoutAction } from '@/features/auth/actions';
const nav: Array<{
    href: string;
    label: string;
    icon: LucideIcon;
    roles: User['role'][];
}> = [
    {
        href: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        roles: [
            'ADMIN',
            'INVENTORY_MANAGER',
            'DEPARTMENT_STAFF',
            'APPROVER',
            'PROCUREMENT_OFFICER',
            'FINANCE_OFFICER',
        ],
    },
    {
        href: '/departments',
        label: 'Departments',
        icon: Building2,
        roles: ['ADMIN'],
    },
    {
        href: '/categories',
        label: 'Categories',
        icon: FolderTree,
        roles: ['ADMIN'],
    },
    {
        href: '/inventory',
        label: 'Inventory',
        icon: PackageSearch,
        roles: ['ADMIN', 'INVENTORY_MANAGER'],
    },
    {
        href: '/users',
        label: 'Users',
        icon: UserRound,
        roles: ['ADMIN'],
    },
    {
        href: '/purchase-request',
        label: 'Purchase Requests',
        icon: ClipboardList,
        roles: ['ADMIN', 'DEPARTMENT_STAFF', 'APPROVER', 'PROCUREMENT_OFFICER'],
    },
    {
        href: '/approval',
        label: 'Approvals',
        icon: ClipboardList,
        roles: ['ADMIN', 'APPROVER'],
    },
    {
        href: '/suppliers',
        label: 'Suppliers',
        icon: Users,
        roles: ['ADMIN', 'PROCUREMENT_OFFICER'],
    },
    {
        href: '/quotations',
        label: 'Quotations',
        icon: ReceiptText,
        roles: ['ADMIN', 'PROCUREMENT_OFFICER'],
    },
    {
        href: '/purchase-orders',
        label: 'Purchase Orders',
        icon: ShoppingCart,
        roles: ['ADMIN', 'PROCUREMENT_OFFICER'],
    },
    {
        href: '/goods-receipt',
        label: 'Goods Receipt',
        icon: Truck,
        roles: ['ADMIN', 'INVENTORY_MANAGER', 'PROCUREMENT_OFFICER'],
    },
    {
        href: '/invoices',
        label: 'Invoices',
        icon: ReceiptText,
        roles: ['ADMIN', 'FINANCE_OFFICER'],
    },
    {
        href: '/payments',
        label: 'Payments',
        icon: CreditCard,
        roles: ['ADMIN', 'FINANCE_OFFICER'],
    },
    {
        href: '/reports',
        label: 'Reports',
        icon: BarChart3,
        roles: ['ADMIN', 'FINANCE_OFFICER'],
    },
];
export function AppLayout({ user, children }: { user: User; children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 lg:flex">
            <aside className="hidden min-h-screen w-64 border-r bg-white p-5 lg:block">
                <Link href="/dashboard" className="mb-10 flex items-center gap-3 text-xl font-bold">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white">
                        <Boxes />
                    </span>
                    InvenFlow
                </Link>
                <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Workspace
                </p>
                <nav className="space-y-1">
                    {nav
                        .filter((n) => n.roles.includes(user.role))
                        .map((n) => {
                            const I = n.icon;
                            return (
                                <Link
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                                    key={n.href}
                                    href={n.href}
                                >
                                    <I className="h-4 w-4" />
                                    {n.label}
                                </Link>
                            );
                        })}
                </nav>
            </aside>
            <div className="min-w-0 flex-1">
                <header className="flex min-h-20 items-center justify-between border-b bg-white px-5 sm:px-8">
                    <div>
                        <p className="text-sm text-slate-500">Role-based operations workspace</p>
                        <p className="font-semibold">{user.role.replaceAll('_', ' ')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-semibold">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                        <form action={logoutAction}>
                            <button
                                title="Logout"
                                className="grid h-10 w-10 place-items-center rounded-xl border text-slate-600"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </header>
                <main className="p-5 sm:p-8">{children}</main>
            </div>
        </div>
    );
}
