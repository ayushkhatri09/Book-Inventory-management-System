// "use client";

// export default function SearchFilterBar({
//   search, onSearch,
//   category, onCategory, categories,
//   ordering, onOrdering,
// }) {
//   return (
//     <div className="mb-4 flex flex-wrap gap-3">
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => onSearch(e.target.value)}
//         placeholder="Search title, author or ISBN..."
//         autoComplete="off"
//         className="min-w-[220px] flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <select
//         value={category}
//         onChange={(e) => onCategory(e.target.value)}
//         className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
//       >
//         <option value="">All categories</option>
//         {categories.map((c) => (
//           <option key={c} value={c}>{c}</option>
//         ))}
//       </select>

//       <select
//         value={ordering}
//         onChange={(e) => onOrdering(e.target.value)}
//         className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
//       >
//         <option value="-created_at">Newest first</option>
//         <option value="title">Title A-Z</option>
//         <option value="price">Price: low to high</option>
//         <option value="-price">Price: high to low</option>
//         <option value="quantity">Stock: low to high</option>
//         <option value="-quantity">Stock: high to low</option>
//       </select>
//     </div>
//   );
// }

"use client";
import Dropdown from "./Dropdown";
const selectClass =
  "w-full cursor-pointer appearance-none rounded-lg border border-stone-300 bg-white py-2.5 pl-3.5 pr-9 text-sm text-stone-800 outline-none transition duration-200 hover:border-amber-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function SearchFilterBar({
  search, onSearch,
  category, onCategory, categories,
  ordering, onOrdering,
}) {
  const hasFilters = search || category || ordering !== "-created_at";

  function clearAll() {
    onSearch("");
    onCategory("");
    onOrdering("-created_at");
  }

  return (
    <div className="anim-fade-up mb-5 flex flex-wrap items-center relative z-30 gap-3 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
      {/* Search */}
      <div className="relative min-w-[220px] flex-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search title, author or ISBN..."
          autoComplete="off"
          className="w-full rounded-lg border border-stone-300 bg-stone-50 py-2.5 pl-9 pr-9 text-sm text-stone-900 outline-none transition duration-200 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-100"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearch("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-200 hover:text-stone-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category */}
      {/* <div className="relative w-full sm:w-48">
        <select
  value={category}
  onChange={(e) => onCategory(e.target.value)}
  className={`${selectClass} [color-scheme:light] accent-amber-500`}
>
  <option value="" className="bg-white text-stone-800">All categories</option>
  {categories.map((c) => (
    <option key={c} value={c} className="bg-white text-stone-800">{c}</option>
  ))}
</select>
        <Chevron />
      </div> */}

      <Dropdown
  className="w-full sm:w-48"
  value={category}
  onChange={onCategory}
  options={[
    { value: "", label: "All categories" },
    ...categories.map((c) => ({ value: c, label: c })),
  ]}
/>

      {/* Ordering */}
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      {/* <div className="relative w-full sm:w-52">
        <select value={ordering} onChange={(e) => onOrdering(e.target.value)} className={selectClass}>
          <option value="-created_at">Newest first</option>
          <option value="title">Title A-Z</option>
          <option value="price">Price: low to high</option>
          <option value="-price">Price: high to low</option>
          <option value="quantity">Stock: low to high</option>
          <option value="-quantity">Stock: high to low</option>
        </select>
        <Chevron />
      </div> */}
      <Dropdown
  className="w-full sm:w-52"
  value={ordering}
  onChange={onOrdering}
  options={[
    { value: "-created_at", label: "Newest first" },
    { value: "title", label: "Title A-Z" },
    { value: "price", label: "Price: low to high" },
    { value: "-price", label: "Price: high to low" },
    { value: "quantity", label: "Stock: low to high" },
    { value: "-quantity", label: "Stock: high to low" },
  ]}
/>

      {/* Reset */}
      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg px-3 py-2.5 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
        >
          Reset
        </button>
      )}
    </div>
  );
}