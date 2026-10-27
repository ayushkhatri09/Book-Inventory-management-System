"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BookForm from "@/app/components/BookForm";
import { getBook, updateBook } from "@/app/lib/api";

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getBook(id)
      .then(setBook)
      .catch(() => setError("Book not found, or the Django server is not running."));
  }, [id]);

  async function handleUpdate(data) {
    await updateBook(id, data);
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="mx-auto max-w-xl">
        <Link href="/inventory" className="text-sm text-blue-600 hover:underline">
          ← Back to inventory
        </Link>
        <h1 className="mb-6 mt-2 text-3xl font-bold">Edit Book</h1>

        {error && <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
        {!book && !error && <p>Loading...</p>}
        {book && (
          <BookForm
            key={book.id}
            initialData={book}
            onSubmit={handleUpdate}
            submitLabel="Update Book"
          />
        )}
      </div>
    </main>
  );
}