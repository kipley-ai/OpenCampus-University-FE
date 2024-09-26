export const CategoryInput = () => {
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
        onChange={(e) => console.log(e.target.value)}
        defaultValue="Development"
        className="mt-12 w-full rounded-lg border border-border bg-transparent px-4 py-2 text-sm text-heading placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 xs:w-1/2 md:w-2/5 xl:w-[35%]"
      >
        <option value="Development">Development</option>
        <option value="Business">Business</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="Music">Music</option>
      </select>
    </>
  );
};
