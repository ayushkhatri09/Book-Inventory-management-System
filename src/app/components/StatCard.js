// export default function StatCard({ title, value, color = "text-gray-900" }) {
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
//     </div>
//   );
// }

export default function StatCard({ title, value, color = "text-stone-900", delay = 0 }) {
  return (
    <div
      className="anim-fade-up group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-stone-200/70"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top accent line: hover par poori width */}
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.25] bg-gradient-to-r from-amber-400 to-amber-600 transition-transform duration-500 group-hover:scale-x-100" />

      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{title}</p>
      <p className={`mt-3 font-serif text-3xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}