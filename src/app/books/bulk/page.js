"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { bulkCreateBooks } from "../../lib/api";

const COLUMNS = [
  { name: "title", label: "Title", type: "text", width: "min-w-[180px]" },
  { name: "author", label: "Author", type: "text", width: "min-w-[140px]" },
  { name: "isbn", label: "ISBN", type: "text", width: "min-w-[140px]" },
  { name: "category", label: "Category", type: "text", width: "min-w-[120px]" },
  { name: "price", label: "Price (₹)", type: "number", width: "min-w-[90px]" },
  { name: "quantity", label: "Qty", type: "number", width: "min-w-[80px]" },
];

let counter = 0;
function newRow(data = {}) {
  counter += 1;
  return { title: "", author: "", isbn: "", category: "", price: "", quantity: "", ...data, rid: counter };
}

function isEmpty(row) {
  return COLUMNS.every((c) => String(row[c.name]).trim() === "");
}

export default function BulkAddPage() {
  const router = useRouter();
  const [rows, setRows] = useState(() => Array.from({ length: 5 }, () => newRow()));
  const [errors, setErrors] = useState({}); // { rid: { field: "message" } }
  const [message, setMessage] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  function updateCell(rid, name, value) {
    setRows(rows.map((r) => (r.rid === rid ? { ...r, [name]: value } : r)));
  }

  function addRow() {
    setRows([...rows, newRow()]);
  }

  function duplicateRow(rid) {
    const index = rows.findIndex((r) => r.rid === rid);
    const copy = newRow({ ...rows[index], isbn: "" }); // ISBN must be unique, so clear it
    const next = [...rows];
    next.splice(index + 1, 0, copy);
    setRows(next);
  }

  function removeRow(rid) {
    setRows(rows.filter((r) => r.rid !== rid));
  }

  function validateRow(r) {
    const e = {};
    if (!r.title.trim()) e.title = "Title is required";
    if (!r.author.trim()) e.author = "Author is required";
    if (!r.isbn.trim()) e.isbn = "ISBN is required";
    if (!r.category.trim()) e.category = "Category is required";
    if (r.price === "" || Number(r.price) < 0) e.price = "Enter a valid price";
    if (r.quantity === "" || Number(r.quantity) < 0 || !Number.isInteger(Number(r.quantity)))
      e.quantity = "Whole number, 0 or more";
    return e;
  }

  async function handleSave() {
    setMessage({ type: "", text: "" });
    const filled = rows.filter((r) => !isEmpty(r)); // blank rows are ignored

    if (filled.length === 0) {
      setMessage({ type: "error", text: "Fill at least one row first." });
      return;
    }

    // Layer 1: quick checks in the browser
    const clientErrors = {};
    filled.forEach((r) => {
      const e = validateRow(r);
      if (Object.keys(e).length > 0) clientErrors[r.rid] = e;
    });
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setMessage({ type: "error", text: "Fix the highlighted rows, then save again." });
      return;
    }

    const payload = filled.map((r) => ({
      title: r.title.trim(),
      author: r.author.trim(),
      isbn: r.isbn.trim(),
      category: r.category.trim(),
      price: Number(r.price).toFixed(2),
      quantity: Number(r.quantity),
    }));

    setSaving(true);
    try {
      // Layer 2: Django validates every row again (duplicate ISBN etc.)
      const result = await bulkCreateBooks(payload);

      const savedRids = new Set();
      const newErrors = {};
      result.results.forEach((res, i) => {
        const rid = filled[i].rid;
        if (res.ok) {
          savedRids.add(rid);
        } else {
          const mapped = {};
          for (const key in res.errors) {
            mapped[key] = Array.isArray(res.errors[key]) ? res.errors[key][0] : String(res.errors[key]);
          }
          newErrors[rid] = mapped;
        }
      });

      if (result.failed === 0) {
        router.push("/inventory");
        return;
      }

      // Keep only the rows that failed, so you can fix and retry them
      setRows(rows.filter((r) => !savedRids.has(r.rid)));
      setErrors(newErrors);
      setMessage({
        type: "error",
        text: `${result.saved} saved, ${result.failed} failed. Fix the red rows and save again.`,
      });
    } catch (err) {
      setMessage({ type: "error", text: "Could not save. Is the Django server running?" });
    } finally {
      setSaving(false);
    }
  }

  const filledCount = rows.filter((r) => !isEmpty(r)).length;

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to inventory
        </Link>
        <h1 className="mb-1 mt-2 text-3xl font-bold">Bulk Add Books</h1>
        <p className="mb-4 text-sm text-gray-500">
          Fill as many rows as you need. Empty rows are ignored. Use ⧉ to copy a row (the ISBN is cleared).
        </p>

        {message.text && (
          <p
            className={`mb-4 rounded-lg p-3 text-sm ${
              message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-3 py-3">#</th>
                {COLUMNS.map((c) => (
                  <th key={c.name} className="px-2 py-3">{c.label}</th>
                ))}
                <th className="px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const rowErrors = errors[row.rid] || {};
                const errorList = Object.values(rowErrors);
                return (
                  <Fragment key={row.rid}>
                    <tr className="border-t border-gray-100">
                      <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                      {COLUMNS.map((c) => (
                        <td key={c.name} className="px-2 py-2">
                          <input
                            type={c.type}
                            min={c.type === "number" ? "0" : undefined}
                            step={c.name === "price" ? "0.01" : c.name === "quantity" ? "1" : undefined}
                            autoComplete="off"
                            value={row[c.name]}
                            onChange={(e) => updateCell(row.rid, c.name, e.target.value)}
                            className={`w-full ${c.width} rounded-md border px-2 py-1.5 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 ${
                              rowErrors[c.name] ? "border-red-400 bg-red-50" : "border-gray-300"
                            }`}
                          />
                        </td>
                      ))}
                      <td className="whitespace-nowrap px-2 py-2">
                        <button
                          type="button"
                          onClick={() => duplicateRow(row.rid)}
                          title="Duplicate row"
                          className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100"
                        >
                          ⧉
                        </button>
                        <button
                          type="button"
                          onClick={() => removeRow(row.rid)}
                          title="Remove row"
                          className="rounded px-2 py-1 text-red-500 hover:bg-red-50"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                    {errorList.length > 0 && (
                      <tr>
                        <td></td>
                        <td colSpan={COLUMNS.length + 1} className="px-2 pb-2 text-xs text-red-600">
                          Row {i + 1}: {errorList.join(" · ")}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={addRow}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-100"
          >
            + Add Row
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : `Save All (${filledCount})`}
          </button>
        </div>
      </div>
    </main>
  );
}