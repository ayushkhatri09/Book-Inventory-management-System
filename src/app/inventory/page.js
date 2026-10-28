// "use client";
// import Link from "next/link";
// import { getBooks, getStats, deleteBook } from "../lib/api";

// import { useEffect, useState } from "react";

// import StatCard from "../components/StatCard";
// import BookTable from "../components/BookTable";
// import SearchFilterBar from "../components/SearchFilterBar";

// export default function Home() {
//   const [books, setBooks] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
// const [category, setCategory] = useState("");
// const [ordering, setOrdering] = useState("-created_at");

// async function loadData() {
//   try {
//     const params = { ordering };
//     if (search.trim()) params.search = search.trim();
//     if (category) params.category = category;

//     const [booksData, statsData] = await Promise.all([getBooks(params), getStats()]);
//     setBooks(booksData);
//     setStats(statsData);
//     setError("");
//   } catch (err) {
//     setError("Unable to connect to the backend. Is the server running?");
//   } finally {
//     setLoading(false);
//   }
// }

// useEffect(() => {
//   // typing rukne ke 300ms baad hi API call hogi
//   const timer = setTimeout(loadData, 300);
//   return () => clearTimeout(timer);
// }, [search, category, ordering]);

// async function handleDelete(book) {
//   if (!window.confirm(`Delete "${book.title}"?`)) return;
//   try {
//     await deleteBook(book.id);
//     loadData();
//   } catch {
//     setError("Could not delete the book.");
//   }
// }

//   return (
//     <main className="min-h-screen bg-gray-50 p-6 text-gray-900">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-6 flex items-center justify-between">
//             <Link href="/" className="text-sm text-blue-600 hover:underline">← Home</Link>
//   <h1 className="text-3xl font-bold">Book Inventory</h1>
//   <Link
//     href="/books/new"
//     className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
//   >
//     + Add Book
//   </Link>

//   <Link
//   href="/books/bulk"
//   className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
// >
//   Bulk Add
// </Link>
// </div>

//         {loading && <p>Loading...</p>}
//         {error && <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}

//         {!loading && !error && (
//           <>
//             <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
//               <StatCard title="Total Books" value={stats.total_books} />
//               <StatCard title="Total Stock" value={stats.total_stock.toLocaleString("en-IN")} />
//               <StatCard
//                 title="Inventory Value"
//                 value={`₹${Number(stats.total_value).toLocaleString("en-IN")}`}
//               />
//               <StatCard
//                 title="Low Stock"
//                 value={stats.low_stock_count}
//                 color={stats.low_stock_count > 0 ? "text-red-600" : "text-gray-900"}
//               />
//             </div>

//             <SearchFilterBar
//   search={search} onSearch={setSearch}
//   category={category} onCategory={setCategory} categories={stats.categories}
//   ordering={ordering} onOrdering={setOrdering}
// />

//             <BookTable books={books} onDelete={handleDelete} />
//           </>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBooks, getStats, deleteBook } from "../lib/api";
import StatCard from "../components/StatCard";
import BookTable from "../components/BookTable";
import SearchFilterBar from "../components/SearchFilterBar";


export default function InventoryPage() {
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [ordering, setOrdering] = useState("-created_at");

  async function loadData() {
    try {
      const params = { ordering };
      if (search.trim()) params.search = search.trim();
      if (category) params.category = category;

      const [booksData, statsData] = await Promise.all([getBooks(params), getStats()]);
      setBooks(booksData);
      setStats(statsData);
      setError("");
    } catch (err) {
      setError("Unable to connect to the backend. Is the server running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // typing rukne ke 300ms baad hi API call hogi
    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [search, category, ordering]);

  async function handleDelete(book) {
    if (!window.confirm(`Delete "${book.title}"?`)) return;
    try {
      await deleteBook(book.id);
      loadData();
    } catch {
      setError("Could not delete the book.");
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 p-6 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-amber-700 hover:underline">
          ← Home
        </Link>

        {/* Heading + buttons */}
        <div className="anim-fade-up mb-8 mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Dashboard</p>
            <h1 className="mt-1 font-serif text-4xl font-semibold">Book Inventory</h1>
          </div>
          <div className="flex gap-2">
            <Link
              href="/books/bulk"
              className="rounded-lg border border-amber-500 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:-translate-y-0.5 hover:bg-amber-50"
            >
              Bulk Add
            </Link>
            <Link
              href="/books/new"
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-900 shadow-md shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-400"
            >
              + Add Book
            </Link>
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-stone-500">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            Loading...
          </div>
        )}

        {error && (
          <p className="anim-shake rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && stats && (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatCard title="Total Books" value={stats.total_books} delay={0} />
              <StatCard
                title="Total Stock"
                value={stats.total_stock.toLocaleString("en-IN")}
                delay={80}
              />
              <StatCard
                title="Inventory Value"
                value={`₹${Number(stats.total_value).toLocaleString("en-IN")}`}
                delay={160}
              />
              <StatCard
                title="Low Stock"
                value={stats.low_stock_count}
                color={stats.low_stock_count > 0 ? "text-red-600" : "text-stone-900"}
                delay={240}
              />
            </div>

            <SearchFilterBar
              search={search}
              onSearch={setSearch}
              category={category}
              onCategory={setCategory}
              categories={stats.categories}
              ordering={ordering}
              onOrdering={setOrdering}
            />

            <BookTable books={books} onDelete={handleDelete} />
          </>
        )}
      </div>
    </main>
  );
}