"use client";

import { useState } from "react";

const EMPTY = {
  title: "",
  author: "",
  isbn: "",
  category: "",
  price: "",
  quantity: "",
};

export default function BookForm({ initialData = EMPTY, onSubmit, submitLabel = "Save Book" }) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!form.isbn.trim()) e.isbn = "ISBN is required";
    if (!form.category.trim()) e.category = "Category is required";
    if (form.price === "" || Number(form.price) < 0) e.price = "Enter a valid price";
    if (form.quantity === "" || Number(form.quantity) < 0 || !Number.isInteger(Number(form.quantity)))
      e.quantity = "Enter a whole number (0 or more)";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    try {
      await onSubmit({
        ...form,
        price: Number(form.price).toFixed(2),
        quantity: Number(form.quantity),
      });
    } catch (apiErrors) {
      // Django sends errors like { isbn: ["book with this isbn already exists."] }
      const mapped = {};
      for (const key in apiErrors) {
        mapped[key] = Array.isArray(apiErrors[key]) ? apiErrors[key][0] : String(apiErrors[key]);
      }
      if (Object.keys(mapped).length === 0) mapped.form = "Could not save. Is the Django server running?";
      setErrors(mapped);
    } finally {
      setSaving(false);
    }
  }

  const fields = [
    { name: "title", label: "Title", type: "text" },
    { name: "author", label: "Author", type: "text" },
    { name: "isbn", label: "ISBN", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "price", label: "Price (₹)", type: "number", step: "0.01" },
    { name: "quantity", label: "Quantity", type: "number", step: "1" },
  ];

  return (
    <form onSubmit={handleSubmit}  autoComplete="off" className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {errors.form && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errors.form}</p>}

      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="mb-1 block text-sm font-medium text-gray-700">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            step={f.step}
            min={f.type === "number" ? "0" : undefined}
            value={form[f.name]}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[f.name] ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors[f.name] && <p className="mt-1 text-xs text-red-600">{errors[f.name]}</p>}
        </div>
      ))}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

    