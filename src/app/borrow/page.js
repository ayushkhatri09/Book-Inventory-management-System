// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { getBooks, getBorrows, createBorrow, returnBorrow } from "../lib/api";

// const EMPTY = { book: "", student_name: "", student_id: "" };

// export default function BorrowPage() {
//   const [books, setBooks] = useState([]);
//   const [borrows, setBorrows] = useState([]);
//   const [form, setForm] = useState(EMPTY);
//   const [msg, setMsg] = useState({ type: "", text: "" });
//   const [saving, setSaving] = useState(false);

//   async function load() {
//     try {
//       const [b, br] = await Promise.all([getBooks(), getBorrows()]);
//       setBooks(b.filter((x) => x.quantity > 0)); // sirf available books
//       setBorrows(br.filter((x) => !x.returned_at)); // sirf abhi issued
//     } catch {
//       setMsg({ type: "error", text: "Error will connecting server" });
//     }
//   }

//   useEffect(() => {
//     load();
//   }, []);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!form.book || !form.student_name.trim() || !form.student_id.trim()) {
//       setMsg({ type: "error", text: "Book, student name aur student ID teeno bharo." });
//       return;
//     }
//     setSaving(true);
//     try {
//       const res = await createBorrow({
//         book: Number(form.book),
//         student_name: form.student_name.trim(),
//         student_id: form.student_id.trim(),
//       });
//       setMsg({ type: "ok", text: `"${res.book_title}" issue ho gayi. Wapsi ki date: ${res.due_date}` });
//       setForm(EMPTY);
//       load();
//     } catch (err) {
//       const first = Object.values(err || {})[0];
//       setMsg({ type: "error", text: Array.isArray(first) ? first[0] : "Borrow nahi ho paya." });
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function handleReturn(id) {
//     try {
//       await returnBorrow(id);
//       setMsg({ type: "ok", text: "Book wapas le li gayi." });
//       load();
//     } catch {
//       setMsg({ type: "error", text: "Return nahi ho paya." });
//     }
//   }

//   const inputClass =
//     "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500";

//   return (
//     <main className="min-h-screen bg-gray-50 p-6 text-gray-900">
//       <div className="mx-auto max-w-3xl">
//         <Link href="/" className="text-sm text-blue-600 hover:underline">← Home</Link>
//         <h1 className="mb-6 mt-2 text-3xl font-bold">Borrow a Book</h1>

//         {msg.text && (
//           <p className={`mb-4 rounded-lg p-3 text-sm ${msg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
//             {msg.text}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//           <div>
//             <label className="mb-1 block text-sm font-medium text-gray-700">Book</label>
//             <select name="book" value={form.book} onChange={handleChange} className={inputClass}>
//               <option value="">Choose a Book...</option>
//               {books.map((b) => (
//                 <option key={b.id} value={b.id}>{b.title} ({b.quantity} available)</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="mb-1 block text-sm font-medium text-gray-700">Student name</label>
//             <input name="student_name" value={form.student_name} onChange={handleChange} className={inputClass} />
//           </div>
//           <div>
//             <label className="mb-1 block text-sm font-medium text-gray-700">Student ID / Roll no.</label>
//             <input name="student_id" value={form.student_id} onChange={handleChange} className={inputClass} />
//           </div>
//           <button type="submit" disabled={saving} className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50">
//             {saving ? "Issuing..." : "Issue Book"}
//           </button>
//         </form>

//         <h2 className="mb-3 mt-8 text-xl font-semibold"> Issued Books ({borrows.length})</h2>
//         {borrows.length === 0 ? (
//           <p className="rounded-xl border bg-white p-6 text-center text-gray-500">Till yet there is not issued any book.</p>
//         ) : (
//           <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
//             <table className="w-full text-left text-sm">
//               <thead className="bg-gray-100 text-gray-600">
//                 <tr>
//                   <th className="px-4 py-3">Book</th>
//                   <th className="px-4 py-3">Student</th>
//                   <th className="px-4 py-3">Due date</th>
//                   <th className="px-4 py-3"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {borrows.map((br) => (
//                   <tr key={br.id} className="border-t border-gray-100">
//                     <td className="px-4 py-3 font-medium">{br.book_title}</td>
//                     <td className="px-4 py-3">{br.student_name} ({br.student_id})</td>
//                     <td className="px-4 py-3">{br.due_date}</td>
//                     <td className="px-4 py-3">
//                       <button onClick={() => handleReturn(br.id)} className="text-blue-600 hover:underline">Return</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBooks, getBorrows, createBorrow, returnBorrow } from "../lib/api";
import Dropdown from "../components/Dropdown";

const EMPTY = { book: "", student_name: "", student_id: "" };

export default function BorrowPage() {
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [shake, setShake] = useState(0);
  const [saving, setSaving] = useState(false);

  function showMsg(type, text) {
    setMsg({ type, text });
    if (type === "error") setShake((s) => s + 1);
  }

  async function load() {
    try {
      const [b, br] = await Promise.all([getBooks(), getBorrows()]);
      setBooks(b.filter((x) => x.quantity > 0)); // sirf available books
      setBorrows(br.filter((x) => !x.returned_at)); // sirf abhi issued
    } catch {
      showMsg("error", "Unable to connect to the server.");
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
      showMsg("error", "Book, student name aur student ID teeno bharo.");
      return;
    }
    setSaving(true);
    try {
      const res = await createBorrow({
        book: Number(form.book),
        student_name: form.student_name.trim(),
        student_id: form.student_id.trim(),
      });
      showMsg("ok", `"${res.book_title}" issue ho gayi. Wapsi ki date: ${res.due_date}`);
      setForm(EMPTY);
      load();
    } catch (err) {
      const first = Object.values(err || {})[0];
      showMsg("error", Array.isArray(first) ? first[0] : "Borrow nahi ho paya.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReturn(id) {
    try {
      await returnBorrow(id);
      showMsg("ok", "Book wapas le li gayi.");
      load();
    } catch {
      showMsg("error", "Return nahi ho paya.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition duration-200 placeholder:text-stone-400 focus:-translate-y-0.5 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-100";
  const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";

  return (
    <main className="min-h-screen bg-stone-50 p-6 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-amber-700 hover:underline">
          ← Home
        </Link>

        <div className="anim-fade-up mb-6 mt-2">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Library Desk</p>
          <h1 className="mt-1 font-serif text-4xl font-semibold">Borrow a Book</h1>
        </div>

        {msg.text && (
          <p
            key={shake}
            className={`anim-shake mb-4 rounded-xl border p-3 text-sm ${
              msg.type === "ok"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {msg.text}
          </p>
        )}

        {/* Issue form */}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="anim-fade-up relative z-30 rounded-2xl border border-stone-200 bg-white shadow-xl shadow-stone-200/60"
          style={{ animationDelay: "100ms" }}
        >
          <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700" />
          <div className="space-y-5 p-6 sm:p-8">
            <div>
              <label className={labelClass}>Book</label>
              <Dropdown
                value={form.book}
                onChange={(v) => setForm({ ...form, book: v })}
                options={[
                  { value: "", label: "Choose a book..." },
                  ...books.map((b) => ({
                    value: String(b.id),
                    label: `${b.title} (${b.quantity} available)`,
                  })),
                ]}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Student name</label>
                <input
                  name="student_name"
                  value={form.student_name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Student ID / Roll no.</label>
                <input
                  name="student_id"
                  value={form.student_id}
                  onChange={handleChange}
                  placeholder="e.g. CS2024-017"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="group inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-stone-900 shadow-md shadow-amber-500/30 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {saving && (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                )}
                {saving ? "Issuing..." : "Issue Book"}
                {!saving && <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>}
              </button>
            </div>
          </div>
        </form>

        {/* Issued books */}
        <h2 className="mb-3 mt-10 font-serif text-2xl font-semibold">
          Issued Books{" "}
          <span className="ml-1 rounded-full bg-amber-100 px-2.5 py-0.5 align-middle font-sans text-sm font-semibold text-amber-800">
            {borrows.length}
          </span>
        </h2>

        {borrows.length === 0 ? (
          <div className="anim-fade-up rounded-2xl border border-stone-200 bg-white p-10 text-center shadow-sm">
            <p className="text-3xl">📖</p>
            <p className="mt-2 text-sm text-stone-500">Till now no Book has been issued .</p>
          </div>
        ) : (
          <div className="anim-fade-up overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl shadow-stone-200/60">
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700" />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-100 text-xs uppercase tracking-wider text-stone-500">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Book</th>
                    <th className="px-5 py-3.5 font-semibold">Student</th>
                    <th className="px-5 py-3.5 font-semibold">Due date</th>
                    <th className="px-5 py-3.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {borrows.map((br, i) => (
                    <tr
                      key={br.id}
                      className="anim-fade-up border-t border-stone-100 transition-colors hover:bg-amber-50/60"
                      style={{ animationDelay: `${Math.min(i, 10) * 50}ms` }}
                    >
                      <td className="px-5 py-4 font-serif text-base font-semibold">{br.book_title}</td>
                      <td className="px-5 py-4 text-stone-600">
                        {br.student_name}{" "}
                        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                          {br.student_id}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-stone-700">{br.due_date}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleReturn(br.id)}
                          className="rounded-md px-3 py-1.5 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                        >
                          Return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}