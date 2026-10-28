import Link from "next/link";
const LOW_STOCK_LIMIT = 5;

export default function BookTable({ books, onDelete }) {
  if (books.length === 0) {
    return (
      <p className="rounded-xl border bg-white p-8 text-center text-gray-500">
        No books found. Please add a book first.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Author</th>
            <th className="px-4 py-3">ISBN</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const isLow = book.quantity < LOW_STOCK_LIMIT;
            return (
              <tr key={book.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">{book.title}</td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">{book.isbn}</td>
                <td className="px-4 py-3">{book.category}</td>
                <td className="px-4 py-3">₹{Number(book.price).toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      isLow ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {book.quantity}
                    {isLow && " (Low)"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
  <Link href={`/books/${book.id}/edit`} className="mr-3 text-blue-600 hover:underline">
    Edit
  </Link>
  <button onClick={() => onDelete(book)} className="text-red-600 hover:underline">
    Delete
  </button>
</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}