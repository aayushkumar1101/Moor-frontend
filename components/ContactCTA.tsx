import Link from "next/link";

export type ContactCTAProps = {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
};

export function ContactCTA({
  title,
  description,
  primaryAction,
  secondaryAction,
}: ContactCTAProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-16 md:px-12 md:pb-24">
      <div className="relative overflow-hidden rounded-[2.75rem] bg-neutral-900 px-8 py-16 text-white shadow-[0_40px_100px_-60px_rgba(15,23,42,0.9)]">
        <div className="relative z-10 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
          <p className="max-w-2xl text-base text-neutral-300 sm:text-lg">{description}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={primaryAction.href}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200"
            >
              {primaryAction.label}
            </Link>
            {secondaryAction ? (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full border border-white/10 blur-3xl md:block" />
      </div>
    </section>
  );
}

