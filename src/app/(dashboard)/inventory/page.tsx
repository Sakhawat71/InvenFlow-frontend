import { getInventory } from '@/services/inventoryService';

import { getCategories } from '@/services/categoryService';

import InventoryForm from '@/components/inventory/inventoryForm';

import StockForm from '@/components/inventory/stockForm';

export default async function InventoryPage() {
    const items = await getInventory();

    const categories = await getCategories();

    return (
        <div className="space-y-8">
            <div>
                <p
                    className="
                    text-sm
                    font-semibold
                    tracking-widest
                    text-indigo-600
                "
                >
                    INVENFLOW
                </p>

                <h1
                    className="
                    mt-2
                    text-3xl
                    font-bold
                "
                >
                    Inventory Management
                </h1>

                <p
                    className="
                    mt-2
                    text-slate-500
                "
                >
                    Track item availability and stock movement.
                </p>
            </div>

            <div
                className="
                rounded-xl
                border
                bg-yellow-50
                p-5
                text-yellow-800
            "
            >
                <span className="font-semibold">Low-stock attention:</span>

                {items.some((item) => item.quantity <= item.minimumStock)
                    ? ' Some items need attention.'
                    : ' All stock levels are healthy.'}
            </div>

            <InventoryForm categories={categories} />

            <div
                className="
                overflow-hidden
                rounded-xl
                border
                bg-white
            "
            >
                <table className="w-full">
                    <thead
                        className="
                            border-b
                            bg-slate-50
                        "
                    >
                        <tr>
                            <th
                                className="
                                p-4
                                text-left
                                text-sm
                            "
                            >
                                Item
                            </th>

                            <th
                                className="
                                p-4
                                text-left
                                text-sm
                            "
                            >
                                Category
                            </th>

                            <th
                                className="
                                p-4
                                text-left
                                text-sm
                            "
                            >
                                Quantity
                            </th>

                            <th
                                className="
                                p-4
                                text-left
                                text-sm
                            "
                            >
                                Minimum
                            </th>

                            <th
                                className="
                                p-4
                                text-left
                                text-sm
                            "
                            >
                                Status
                            </th>

                            <th
                                className="
                                p-4
                                text-left
                                text-sm
                            "
                            >
                                Stock Update
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="
                                        p-8
                                        text-center
                                        text-slate-500
                                    "
                                >
                                    No inventory items found.
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr
                                    key={item.id}

                                    className="
                                    border-b
                                "
                                >
                                    <td
                                        className="
                                    p-4
                                    font-medium
                                "
                                    >
                                        <div>
                                            <p>{item.name}</p>

                                            <p
                                                className="
                                            text-xs
                                            text-slate-500
                                        "
                                            >
                                                {item.sku}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        {item.category?.name ?? 'Uncategorized'}
                                    </td>

                                    <td className="p-4">
                                        {item.quantity} {item.unit}
                                    </td>

                                    <td className="p-4">{item.minimumStock}</td>

                                    <td className="p-4">
                                        {item.quantity <= item.minimumStock ? (
                                            <span
                                                className="
                                                rounded-full
                                                bg-red-100
                                                px-3
                                                py-1
                                                text-xs
                                                font-medium
                                                text-red-700
                                            "
                                            >
                                                Low Stock
                                            </span>
                                        ) : (
                                            <span
                                                className="
                                                rounded-full
                                                bg-green-100
                                                px-3
                                                py-1
                                                text-xs
                                                font-medium
                                                text-green-700
                                            "
                                            >
                                                Available
                                            </span>
                                        )}
                                    </td>

                                    <td className="p-4">
                                        <StockForm itemId={item.id} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
