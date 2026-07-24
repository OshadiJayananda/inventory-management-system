import { useEffect, useState } from "react";

import CategoryForm from "../components/CategoryForm";

import type { Category } from "../utils/types";

import { getCategories, saveCategories } from "../utils/categoryStorage";

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
    <div>
      <h1>Categories</h1>

      <button onClick={() => setShowForm(true)}>Add Category</button>

      {showForm && (
        <CategoryForm
          onAddCategory={handleAddCategory}
          onCancel={() => setShowForm(false)}
        />
      )}

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>

                <td>
                  <button onClick={() => handleDeleteCategory(category.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Categories;
