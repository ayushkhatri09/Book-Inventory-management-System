// import Link from "next/link";
// const LOW_STOCK_LIMIT = 5;

// export default function BookTable({ books, onDelete }) {
//   if (books.length === 0) {
//     return (
//       <p className="rounded-xl border bg-white p-8 text-center text-gray-500">
//         No books found. Please add a book first.
//       </p>
//     );
//   }

//   return (
//     <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
//       <table className="w-full text-left text-sm">
//         <thead className="bg-gray-100 text-gray-600">
//           <tr>
//             <th className="px-4 py-3">Title</th>
//             <th className="px-4 py-3">Author</th>
//             <th className="px-4 py-3">ISBN</th>
//             <th className="px-4 py-3">Category</th>
//             <th className="px-4 py-3">Price</th>
//             <th className="px-4 py-3">Stock</th>
//             <th className="px-4 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {books.map((book) => {
//             const isLow = book.quantity < LOW_STOCK_LIMIT;
//             return (
//               <tr key={book.id} className="border-t border-gray-100">
//                 <td className="px-4 py-3 font-medium">{book.title}</td>
//                 <td className="px-4 py-3">{book.author}</td>
//                 <td className="px-4 py-3">{book.isbn}</td>
//                 <td className="px-4 py-3">{book.category}</td>
//                 <td className="px-4 py-3">₹{Number(book.price).toLocaleString("en-IN")}</td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`rounded-full px-2 py-1 text-xs font-semibold ${
//                       isLow ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {book.quantity}
//                     {isLow && " (Low)"}
//                   </span>
//                 </td>
//                 <td className="whitespace-nowrap px-4 py-3">
//   <Link href={`/books/${book.id}/edit`} className="mr-3 text-blue-600 hover:underline">
//     Edit
//   </Link>
//   <button onClick={() => onDelete(book)} className="text-red-600 hover:underline">
//     Delete
//   </button>
// </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import Link from "next/link";

const LOW_STOCK_LIMIT = 5;

export default function BookTable({ books, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="anim-fade-up rounded-2xl border border-stone-200 bg-white p-12 text-center shadow-sm">
        <p className="text-4xl">📚</p>
        <p className="mt-3 font-serif text-xl font-semibold text-stone-800">No books found</p>
        <p className="mt-1 text-sm text-stone-500">Search badlo ya ek nayi book add karo.</p>
        <Link
          href="/books/new"
          className="mt-5 inline-block rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5 hover:bg-amber-400"
        >
          + Add Book
        </Link>
      </div>
    );
  }

  return (
    <div className="anim-fade-up overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl shadow-stone-200/60">
      <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700" />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-100 text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Title</th>
              <th className="px-5 py-3.5 font-semibold">Author</th>
              <th className="px-5 py-3.5 font-semibold">ISBN</th>
              <th className="px-5 py-3.5 font-semibold">Category</th>
              <th className="px-5 py-3.5 font-semibold">Price</th>
              <th className="px-5 py-3.5 font-semibold">Stock</th>
              <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => {
              const isLow = book.quantity < LOW_STOCK_LIMIT;
              return (
                <tr
                  key={book.id}
                  className="anim-fade-up border-t border-stone-100 transition-colors duration-200 hover:bg-amber-50/60"
                  style={{ animationDelay: `${Math.min(i, 10) * 50}ms` }}
                >
                  <td className="px-5 py-4 font-serif text-base font-semibold text-stone-900">
                    {book.title}
                  </td>
                  <td className="px-5 py-4 text-stone-600">{book.author}</td>
                  <td className="px-5 py-4 font-mono text-xs text-stone-500">{book.isbn}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-stone-800">
                    ₹{Number(book.price).toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isLow ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isLow ? "animate-pulse bg-red-500" : "bg-emerald-500"
                        }`}
                      />
                      {book.quantity}
                      {isLow && " Low"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <Link
                      href={`/books/${book.id}/edit`}
                      className="mr-2 rounded-md px-3 py-1.5 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(book)}
                      className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}