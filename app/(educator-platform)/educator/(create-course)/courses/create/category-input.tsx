import { useCategoryIndex } from "@/hooks/api/educator-platform";

interface CategoryInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CategoryInput: React.FC<CategoryInputProps> = ({ value, onChange }) => {
  const { data: categoriesData, isLoading, error } = useCategoryIndex();

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories. Please try again.</p>;

  const categories = categoriesData?.data?.data?.categories || {};

  // console.log("Categories:", categories);

  return (
    <>
      <h1 className="mt-12 text-center text-3xl font-bold">
        What category best fits the knowledge you'll share?
      </h1>
      <h2 className="mt-8 text-center">
        If you're not sure about the right category, you can change it later.
      </h2>
      <select
        name="categories"
        id="categories"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="mt-12 w-full rounded-lg border border-border bg-transparent px-4 py-2 text-sm text-heading placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 xs:w-1/2 md:w-2/5 xl:w-[35%]"
      >
        <option value="">Select a category</option>
        {Object.entries(categories).map(([id, name]) => (
          <option key={id} value={id}>
            {name as string}
          </option>
        ))}
      </select>
    </>
  );
};
