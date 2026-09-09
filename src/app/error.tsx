'use client';
export default function Error({ reset }: { reset: () => void }) {
    return (
        <main className="grid min-h-screen place-items-center p-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Something went wrong</h1>
                <button className="btn mt-5" onClick={reset}>
                    Try again
                </button>
            </div>
        </main>
    );
}
