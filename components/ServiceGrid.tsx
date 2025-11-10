import { SectionHeading, SectionHeadingProps } from "./SectionHeading";

export type ServiceItem = {
  title: string;
  description: string;
  tags?: string[];
};

export type ServiceGridProps = {
  heading: SectionHeadingProps;
  services: ServiceItem[];
};

export function ServiceGrid({ heading, services }: ServiceGridProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:px-12 md:py-24">
      <SectionHeading {...heading} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)]"
          >
            <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-600">{service.description}</p>
            {service.tags?.length ? (
              <div className="mt-auto flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

