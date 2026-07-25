import { useEffect, useState } from "react";
import CategoryForm from "../components/CategoryForm";
import type { Category } from "../utils/types";
import { getCategories, saveCategories } from "../utils/categoryStorage";
import { getProducts } from "../utils/storage";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    return getCategories();
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const handleAddCategory = (category: Category) => {
    const categoryAlreadyExists = categories.some(
      (existingCategory) =>
        existingCategory.name.toLowerCase() === category.name.toLowerCase(),
    );

    if (categoryAlreadyExists) {
      alert("A category with this name already exists.");

      return;
    }

    setCategories((currentCategories) => [...currentCategories, category]);

    setShowForm(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const products = getProducts();

    const categoryName = categories.find(
      (category) => category.id === categoryId,
    )?.name;

    const categoryInUse = products.some(
      (product) => product.category === categoryName,
    );

    if (categoryInUse) {
      alert(
        "This category cannot be deleted because it is currently assigned to one or more products.",
      );

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmed) {
      return;
    }

    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== categoryId),
    );
  };
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>

          <p className="mt-2 text-gray-500">
            Manage product categories in your inventory
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
        >
          + Add Category
        </button>
      </div>

      {/* Category Form */}
      {showForm && (
        <CategoryForm
          onAddCategory={handleAddCategory}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Categories Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {categories.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No categories found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Category Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {category.name}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
