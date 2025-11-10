import Image from "next/image";
import Link from "next/link";
import { SectionHeading, SectionHeadingProps } from "./SectionHeading";

export type Project = {
  title: string;
  category: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  stats?: {
    label: string;
    value: string;
  }[];
  href: string;
};

export type ProjectShowcaseProps = {
  heading: SectionHeadingProps;
  featured: Project[];
};

export function ProjectShowcase({ heading, featured }: ProjectShowcaseProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:px-12 md:py-24">
      <SectionHeading {...heading} />

      <div className="grid gap-10 lg:grid-cols-2">
        {featured.map((project) => (
          <article
            key={project.title}
            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col gap-6 p-8">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
                <span className="h-[6px] w-[6px] rounded-full bg-sky-600" />
                {project.category}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-semibold text-neutral-900">{project.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {project.description}
                </p>
              </div>

              {project.stats?.length ? (
                <dl className="grid gap-4 sm:grid-cols-3">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-xs uppercase tracking-widest text-neutral-500">
                        {stat.label}
                      </dt>
                      <dd className="text-lg font-semibold text-neutral-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <Link
                href={project.href}
                className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-neutral-900 transition hover:gap-3 hover:text-neutral-700"
              >
                View project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

