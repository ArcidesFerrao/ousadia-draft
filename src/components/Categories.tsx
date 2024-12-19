"use server";
import db from "@/db/db";

interface CategoriesProps {
  onCategoryChange: (categoryId: string) => void;
}

export const Categories = async ({ onCategoryChange }: CategoriesProps) => {
  const categoryList = await db.category.findMany();
  return (
    <div className="category flex justify-between">
      <h3>Categoria:</h3>
      <div className="radio-category flex gap-2">
        {categoryList.map((category) => (
          <label key={category.id} className="radio">
            <input
              type="radio"
              name="category"
              value={category.id}
              onChange={() => onCategoryChange(category.id.toString())}
            />
            <span className="radio-option">{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
