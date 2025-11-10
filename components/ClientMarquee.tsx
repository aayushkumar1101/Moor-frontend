export type ClientMarqueeProps = {
  clients: { name: string }[];
};

export function ClientMarquee({ clients }: ClientMarqueeProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 md:px-12 md:py-16">
      <div className="rounded-3xl border border-neutral-200 bg-white px-6 py-8 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.35)] sm:px-10">
        <div className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Trusted by progressive teams
        </div>
        <div className="grid gap-4 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {clients.map((client) => (
            <span key={client.name} className="flex items-center justify-center rounded-full bg-neutral-50 px-4 py-3 text-neutral-600">
              {client.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

