import Image from "next/image";
import Link from "next/link";

export type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions: HeroAction[];
  stats?: HeroStat[];
  image?: {
    src: string;
    alt: string;
  };
};

export function Hero({
  eyebrow,
  title,
  description,
  actions,
  stats = [],
  image,
}: HeroProps) {
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-20 pt-14 md:grid-cols-[1.05fr,0.95fr] md:px-12 md:pb-28 md:pt-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          {eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {actions.map((action) => {
            const isPrimary = action.variant !== "secondary";

            const baseStyles =
              "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

            const variantStyles = isPrimary
              ? "bg-neutral-900 text-white hover:bg-neutral-700 focus-visible:outline-neutral-900"
              : "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-500 hover:text-neutral-950 focus-visible:outline-neutral-400";

            return (
              <Link key={action.href} href={action.href} className={`${baseStyles} ${variantStyles}`}>
                {action.label}
              </Link>
            );
          })}
        </div>

        {stats.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-sm text-neutral-600">{stat.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {image ? (
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-3xl bg-neutral-100 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)]">
          <Image
            src={image.src}
            alt={image.alt}
            width={640}
            height={760}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 540px"
            className="w-full max-w-[420px] rounded-2xl object-cover shadow-xl md:max-w-full"
            priority
          />
        </div>
      ) : null}
    </section>
  );
}

