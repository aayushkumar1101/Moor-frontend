import Image from "next/image";
import Link from "next/link";

export type MediaArticlesProps = {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  featured: {
    title: string;
    description: string;
    author: string;
    image: string;
    readTime: string;
  };
  articles: {
    title: string;
    image: string;
    readTime?: string;
  }[];
};

export function MediaArticles({
  title,
  description,
  cta,
  featured,
  articles,
}: MediaArticlesProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-4xl font-bold text-neutral-900 md:text-5xl">
            {title}
          </h2>
          <p className="text-base text-neutral-600">{description}</p>
        </div>
        <Link
          href={cta.href}
          className="hidden rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 md:block"
        >
          {cta.label}
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* Featured Article */}
        <div className="group relative overflow-hidden rounded-2xl bg-neutral-100 shadow-lg transition hover:shadow-xl">
          <div className="relative aspect-[16/10]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
          <div className="p-8">
            <h3 className="mb-3 text-2xl font-bold text-neutral-900">
              {featured.title}
            </h3>
            <p className="mb-4 text-base leading-relaxed text-neutral-600">
              {featured.description}
            </p>
            <div className="flex items-center justify-between text-sm text-neutral-500">
              <span>{featured.author}</span>
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {featured.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Side Articles */}
        <div className="flex flex-col gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-neutral-100 shadow-md transition hover:shadow-lg"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h4 className="mb-2 text-base font-semibold text-neutral-900">
                  {article.title}
                </h4>
                {article.readTime && (
                  <span className="flex items-center gap-1 text-xs text-neutral-500">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {article.readTime}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mt-8 text-center md:hidden">
        <Link
          href={cta.href}
          className="inline-block rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}

