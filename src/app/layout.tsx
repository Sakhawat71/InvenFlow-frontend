import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'InvenFlow',
    description: 'Inventory and procurement management',
};
export default function Root({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
