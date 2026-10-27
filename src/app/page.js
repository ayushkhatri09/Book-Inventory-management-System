import Link from "next/link";

// Image badalni ho to sirf yahan naam badlo (file public/ folder mein honi chahiye)
const HERO_IMAGE = "/hero.jpg";

const FEATURES = [
  { title: "Track every book", desc: "Stock, price aur category, sab ek jagah." },
  { title: "Issue with ease", desc: "Student ko book do, due date apne aap set." },
  { title: "Never run short", desc: "Low stock par turant red alert." },
];

const ABOUT_CARDS = [
  { no: "01", title: "Add Books", desc: "Ek ek karke ya bulk form se dozens of books ek saath inventory mein daalo." },
  { no: "02", title: "Search & Filter", desc: "Title, author ya ISBN se dhundho, category se chhaanto, price ya stock se sort karo." },
  { no: "03", title: "Low Stock Alerts", desc: "Jis book ka stock 5 se kam ho, wo red badge ke saath turant dikh jaati hai." },
  { no: "04", title: "Borrow & Return", desc: "Student ke naam aur ID ke saath book issue karo. Return par stock apne aap wapas badh jaata hai." },
  { no: "05", title: "Live Dashboard", desc: "Total books, total stock, inventory value aur low-stock count, sab ek nazar mein." },
  { no: "06", title: "Built on Solid Tech", desc: "Next.js frontend aur Django REST Framework backend, ek real-world architecture." },
];

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/91XXXXXXXXXX",
    path: "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42z",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* HERO SECTION */}
      <section
        className="relative flex min-h-screen flex-col bg-stone-900 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(28,20,14,0.80), rgba(28,20,14,0.65)), url('${HERO_IMAGE}')`,
        }}
      >
        {/* Navbar */}
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-serif text-lg font-semibold tracking-wide text-amber-100">
            📚 Bookshelf
          </span>
          <div className="flex gap-5 text-sm text-stone-200">
            <a href="#about" className="hover:text-amber-200">About</a>
            <Link href="/inventory" className="hover:text-amber-200">Inventory</Link>
            <Link href="/borrow" className="hover:text-amber-200">Borrow</Link>
            <Link href="/books/bulk" className="hover:text-amber-200">Bulk Add</Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 pb-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber-300">
              Library &amp; Bookstore Manager
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Where every book
              <br />
              finds its shelf.
            </h1>
            <p className="mt-5 max-w-xl font-serif text-lg italic text-stone-300">
              Ek achhi library ki pehchaan uski books se nahi, uske hisaab-kitaab se hoti hai.
              Apni har kitaab ko sambhalo, simple aur saaf tareeke se.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/books/new"
                className="rounded-md bg-amber-500 px-5 py-2 text-sm font-semibold text-stone-900 transition hover:bg-amber-400"
              >
                + Add Book
              </Link>
              <Link
                href="/borrow"
                className="rounded-md border border-amber-300 px-5 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10"
              >
                Borrow Book
              </Link>
              <Link
                href="/inventory"
                className="px-2 py-2 text-sm text-stone-300 underline-offset-4 hover:text-white hover:underline"
              >
                View Inventory →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <div className="mb-3 h-0.5 w-8 bg-amber-500" />
              <h3 className="font-serif text-xl font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-stone-600">{f.desc}</p>
            </div>
          ))}
        </div>
        <p className="pb-8 text-center font-serif text-sm italic text-stone-400">
          “A reader lives a thousand lives.” Keep the shelves full.
        </p>
      </section>

            {/* ABOUT SECTION */}
      <section id="about" className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">About</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            Ek simple system, bade kaam ke liye.
          </h2>
          <p className="mt-3 max-w-2xl font-serif italic text-stone-500">
            Ye project library aur bookstore ke roz ke hisaab-kitaab ko aasan banata hai:
            books add karo, stock dekho, aur students ko books issue karo.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_CARDS.map((c) => (
              <div
                key={c.no}
                className="rounded-lg border border-stone-200 bg-stone-50 p-6 transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-md"
              >
                <span className="font-serif text-2xl text-amber-500">{c.no}</span>
                <h3 className="mt-2 font-serif text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-300">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-semibold text-amber-100">📚 Bookshelf</p>
            <p className="mt-2 text-sm text-stone-400">
              Library aur bookstore ke liye ek simple inventory aur borrow system.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/inventory" className="hover:text-amber-200">Inventory</Link></li>
              <li><Link href="/borrow" className="hover:text-amber-200">Borrow</Link></li>
              <li><Link href="/books/new" className="hover:text-amber-200">Add Book</Link></li>
              <li><a href="#about" className="hover:text-amber-200">About</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Follow Us</p>
            <div className="mt-3 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-600 text-stone-300 transition hover:border-amber-400 hover:text-amber-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 py-4 text-center text-xs text-stone-500">
          © 2026 Bookshelf. All rights reserved.
        </div>
      </footer>
    </main>
  );
}