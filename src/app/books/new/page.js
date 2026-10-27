"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import BookForm from "../../components/BookForm";
import { createBook } from "../../lib/api";

export default function NewBookPage() {
  const router = useRouter();

  async function handleCreate(data) {
    await createBook(data);
    router.push("/inventory");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to inventory
        </Link>
        <h1 className="mb-6 mt-2 text-3xl font-bold">Add New Book</h1>
        <BookForm onSubmit={handleCreate} submitLabel="Add Book" />
      </div>
    </main>
  );
}