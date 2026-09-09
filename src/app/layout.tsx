import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
    title: 'InvenFlow',
    description: 'Inventory and Procurement System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                    }}
                />
            </body>
        </html>
    );
}
