import { getCategories } from '@/services/categoryService';

import CategoryForm from '@/components/category/categoryForm';

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-8">
            <div>
                <h1
                    className="
text-3xl
font-bold
"
                >
                    Category Management
                </h1>

                <p className="text-slate-500">Manage inventory categories</p>
            </div>

            <CategoryForm />

            <div
                className="
rounded-xl
border
bg-white
p-5
"
            >
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Category</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="border-t">
                                <td className="py-3">{category.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
