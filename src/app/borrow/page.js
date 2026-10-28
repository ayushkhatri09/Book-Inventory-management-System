"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBooks, getBorrows, createBorrow, returnBorrow } from "../lib/api";

const EMPTY = { book: "", student_name: "", student_id: "" };

export default function BorrowPage() {
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const [b, br] = await Promise.all([getBooks(), getBorrows()]);
      setBooks(b.filter((x) => x.quantity > 0)); // sirf available books
      setBorrows(br.filter((x) => !x.returned_at)); // sirf abhi issued
    } catch {
      setMsg({ type: "error", text: "Error will connecting server" });
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.book || !form.student_name.trim() || !form.student_id.trim()) {
      setMsg({ type: "error", text: "Book, student name aur student ID teeno bharo." });
      return;
    }
    setSaving(true);
    try {
      const res = await createBorrow({
        book: Number(form.book),
        student_name: form.student_name.trim(),
        student_id: form.student_id.trim(),
      });
      setMsg({ type: "ok", text: `"${res.book_title}" issue ho gayi. Wapsi ki date: ${res.due_date}` });
      setForm(EMPTY);
      load();
    } catch (err) {
      const first = Object.values(err || {})[0];
      setMsg({ type: "error", text: Array.isArray(first) ? first[0] : "Borrow nahi ho paya." });
    } finally {
      setSaving(false);
    }
  }

  async function handleReturn(id) {
    try {
      await returnBorrow(id);
      setMsg({ type: "ok", text: "Book wapas le li gayi." });
      load();
    } catch {
      setMsg({ type: "error", text: "Return nahi ho paya." });
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← Home</Link>
        <h1 className="mb-6 mt-2 text-3xl font-bold">Borrow a Book</h1>

        {msg.text && (
          <p className={`mb-4 rounded-lg p-3 text-sm ${msg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {msg.text}
          </p>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Book</label>
            <select name="book" value={form.book} onChange={handleChange} className={inputClass}>
              <option value="">Choose a Book...</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>{b.title} ({b.quantity} available)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Student name</label>
            <input name="student_name" value={form.student_name} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Student ID / Roll no.</label>
            <input name="student_id" value={form.student_id} onChange={handleChange} className={inputClass} />
          </div>
          <button type="submit" disabled={saving} className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50">
            {saving ? "Issuing..." : "Issue Book"}
          </button>
        </form>

        <h2 className="mb-3 mt-8 text-xl font-semibold"> Issued Books ({borrows.length})</h2>
        {borrows.length === 0 ? (
          <p className="rounded-xl border bg-white p-6 text-center text-gray-500">Till yet there is not issued any book.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3">Book</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Due date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {borrows.map((br) => (
                  <tr key={br.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium">{br.book_title}</td>
                    <td className="px-4 py-3">{br.student_name} ({br.student_id})</td>
                    <td className="px-4 py-3">{br.due_date}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleReturn(br.id)} className="text-blue-600 hover:underline">Return</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}