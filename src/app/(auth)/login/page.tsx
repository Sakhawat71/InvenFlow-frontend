'use client';
import { useActionState, useState } from 'react';
import { Boxes, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { loginAction } from '@/features/auth/actions';
export default function Login() {
    const [s, a, p] = useActionState(loginAction, {});
    const [show, setShow] = useState(false);

    return (
        <main className="min-h-screen bg-slate-950 p-5">
            <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
                <section className="hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900 p-12 text-white lg:block">
                    <div className="flex items-center gap-3 text-xl font-bold">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
                            <Boxes />
                        </span>
                        InvenFlow
                    </div>
                    <h1 className="mt-36 text-4xl font-bold leading-tight">
                        One flow for inventory, procurement and finance.
                    </h1>
                    <p className="mt-5 max-w-md text-indigo-100">
                        Secure role-based operations for every procurement stage.
                    </p>
                </section>

                <section className="flex items-center justify-center p-8">
                    <form action={a} className="w-full max-w-md space-y-5">
                        <p className="text-sm font-bold tracking-widest text-indigo-600">
                            WELCOME BACK
                        </p>
                        <h2 className="text-3xl font-bold">Sign in to InvenFlow</h2>
                        <p className="text-sm text-slate-500">
                            Use your organization account to continue.
                        </p>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium">Email</span>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <input
                                    className="input pl-9"
                                    name="email"
                                    type="email"
                                    placeholder="admin@invenflow.com"
                                    required
                                />
                            </div>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium">Password</span>
                            <div className="relative">
                                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <input
                                    className="input pl-9 pr-10"
                                    name="password"
                                    type={show ? 'text' : 'password'}
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5 text-slate-500"
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </label>

                        {s.error && (
                            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                {s.error}
                            </p>
                        )}

                        <button disabled={p} className="btn w-full">
                            {p ? 'Signing in...' : 'Sign in to InvenFlow'}
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}
