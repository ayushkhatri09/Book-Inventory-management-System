// "use client";

// import { useState } from "react";

// const EMPTY = {
//   title: "",
//   author: "",
//   isbn: "",
//   category: "",
//   price: "",
//   quantity: "",
// };

// export default function BookForm({ initialData = EMPTY, onSubmit, submitLabel = "Save Book" }) {
//   const [form, setForm] = useState(initialData);
//   const [errors, setErrors] = useState({});
//   const [saving, setSaving] = useState(false);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   function validate() {
//     const e = {};
//     if (!form.title.trim()) e.title = "Title is required";
//     if (!form.author.trim()) e.author = "Author is required";
//     if (!form.isbn.trim()) e.isbn = "ISBN is required";
//     if (!form.category.trim()) e.category = "Category is required";
//     if (form.price === "" || Number(form.price) < 0) e.price = "Enter a valid price";
//     if (form.quantity === "" || Number(form.quantity) < 0 || !Number.isInteger(Number(form.quantity)))
//       e.quantity = "Enter a whole number (0 or more)";
//     return e;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const found = validate();
//     setErrors(found);
//     if (Object.keys(found).length > 0) return;

//     setSaving(true);
//     try {
//       await onSubmit({
//         ...form,
//         price: Number(form.price).toFixed(2),
//         quantity: Number(form.quantity),
//       });
//     } catch (apiErrors) {
//       // Django sends errors like { isbn: ["book with this isbn already exists."] }
//       const mapped = {};
//       for (const key in apiErrors) {
//         mapped[key] = Array.isArray(apiErrors[key]) ? apiErrors[key][0] : String(apiErrors[key]);
//       }
//       if (Object.keys(mapped).length === 0) mapped.form = "Could not save. Is the Django server running?";
//       setErrors(mapped);
//     } finally {
//       setSaving(false);
//     }
//   }

//   const fields = [
//     { name: "title", label: "Title", type: "text" },
//     { name: "author", label: "Author", type: "text" },
//     { name: "isbn", label: "ISBN", type: "text" },
//     { name: "category", label: "Category", type: "text" },
//     { name: "price", label: "Price (₹)", type: "number", step: "0.01" },
//     { name: "quantity", label: "Quantity", type: "number", step: "1" },
//   ];

//   return (
//     <form onSubmit={handleSubmit}  autoComplete="off" className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//       {errors.form && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errors.form}</p>}

//       {fields.map((f) => (
//         <div key={f.name}>
//           <label htmlFor={f.name} className="mb-1 block text-sm font-medium text-gray-700">
//             {f.label}
//           </label>
//           <input
//             id={f.name}
//             name={f.name}
//             type={f.type}
//             step={f.step}
//             min={f.type === "number" ? "0" : undefined}
//             value={form[f.name]}
//             onChange={handleChange}
//             className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 ${
//               errors[f.name] ? "border-red-400" : "border-gray-300"
//             }`}
//           />
//           {errors[f.name] && <p className="mt-1 text-xs text-red-600">{errors[f.name]}</p>}
//         </div>
//       ))}

//       <button
//         type="submit"
//         disabled={saving}
//         className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
//       >
//         {saving ? "Saving..." : submitLabel}
//       </button>
//     </form>
//   );
// }

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

const FIELDS = [
  { name: "title", label: "Title", type: "text", placeholder: "e.g. Atomic Habits", span: "sm:col-span-2" },
  { name: "author", label: "Author", type: "text", placeholder: "e.g. James Clear", span: "sm:col-span-2" },
  { name: "isbn", label: "ISBN", type: "text", placeholder: "Unique book number", span: "" },
  { name: "category", label: "Category", type: "text", placeholder: "e.g. Self-Help", span: "" },
  { name: "price", label: "Price (₹)", type: "number", step: "0.01", placeholder: "0.00", span: "" },
  { name: "quantity", label: "Quantity", type: "number", step: "1", placeholder: "0", span: "" },
];

export default function BookForm({ initialData = EMPTY, onSubmit, submitLabel = "Save Book" }) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [shake, setShake] = useState(0); // har failed submit par badhta hai

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined }); // type karte hi error hatao
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!form.isbn.trim()) e.isbn = "ISBN is required";
    if (!form.category.trim()) e.category = "Category is required";
    if (form.price === "" || Number(form.price) < 0) e.price = "Enter a valid price";
    if (form.quantity === "" || Number(form.quantity) < 0 || !Number.isInteger(Number(form.quantity)))
      e.quantity = "Whole number, 0 or more";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setShake((s) => s + 1);
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        ...form,
        price: Number(form.price).toFixed(2),
        quantity: Number(form.quantity),
      });
    } catch (apiErrors) {
      const mapped = {};
      for (const key in apiErrors) {
        mapped[key] = Array.isArray(apiErrors[key]) ? apiErrors[key][0] : String(apiErrors[key]);
      }
      if (Object.keys(mapped).length === 0) mapped.form = "Could not save. Is the server running?";
      setErrors(mapped);
      setShake((s) => s + 1);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      className="anim-fade-up overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl shadow-stone-200/60"
    >
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700" />

      <div className="p-6 sm:p-8">
        {errors.form && (
          <p className="anim-shake mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {errors.form}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {FIELDS.map((f, i) => (
            <div
              key={f.name}
              className={`anim-fade-up ${f.span}`}
              style={{ animationDelay: `${100 + i * 70}ms` }}
            >
              <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-stone-700">
                {f.label}
              </label>
              <input
                key={errors[f.name] ? `err-${shake}` : "ok"}
                id={f.name}
                name={f.name}
                type={f.type}
                step={f.step}
                min={f.type === "number" ? "0" : undefined}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition duration-200 focus:-translate-y-0.5 focus:bg-white focus:ring-4 ${
                  errors[f.name]
                    ? "anim-shake border-red-400 focus:ring-red-100"
                    : "border-stone-300 focus:border-amber-500 focus:ring-amber-100"
                }`}
              />
              {errors[f.name] && <p className="mt-1.5 text-xs text-red-600">{errors[f.name]}</p>}
            </div>
          ))}
        </div>

        <div
          className="anim-fade-up mt-8 flex items-center justify-end"
          style={{ animationDelay: `${100 + FIELDS.length * 70}ms` }}
        >
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
            {saving ? "Saving..." : submitLabel}
            {!saving && <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>}
          </button>
        </div>
      </div>
    </form>
  );
}
    