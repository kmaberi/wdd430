export default function Page() {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to your dashboard. Data is publicly visible for now.</p>
      </header>

      <section className="rounded-xl border p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-semibold">Quick start</h2>
        <p className="mt-3 text-gray-700">
          Use the sidebar to open invoices and customers. If your own database is not configured in
          Vercel, the detailed cards and invoice data are not yet fetched.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-5 bg-gray-50">Dashboard Widget 1</div>
        <div className="rounded-xl border p-5 bg-gray-50">Dashboard Widget 2</div>
      </section>

      <section className="rounded-xl border p-5 bg-gray-50">
        <p className="text-sm text-gray-500">This route is now accessible without login to verify Vercel deployment.</p>
      </section>
    </main>
  );
}
