"use client";

export default function SearchFilterBar({
  search, onSearch,
  category, onCategory, categories,
  ordering, onOrdering,
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search title, author or ISBN..."
        autoComplete="off"
        className="min-w-[220px] flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={ordering}
        onChange={(e) => onOrdering(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
      >
        <option value="-created_at">Newest first</option>
        <option value="title">Title A-Z</option>
        <option value="price">Price: low to high</option>
        <option value="-price">Price: high to low</option>
        <option value="quantity">Stock: low to high</option>
        <option value="-quantity">Stock: high to low</option>
      </select>
    </div>
  );
}