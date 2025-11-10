import Image from "next/image";

export type AIInsightsProps = {
  title: string;
  description: string;
  detailedDescription: string;
  stats: {
    value: string;
    label: string;
  }[];
  features: {
    number: number;
    title: string;
    description: string;
    image: string;
  }[];
};

export function AIInsights({
  title,
  description,
  detailedDescription,
  stats,
  features,
}: AIInsightsProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      {/* Header */}
      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-4xl font-bold text-neutral-900 md:text-5xl">
            {title}
          </h2>
          <p className="text-lg text-neutral-600">{description}</p>
        </div>
        <div className="flex items-center">
          <p className="text-base leading-relaxed text-neutral-600">
            {detailedDescription}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border border-neutral-200 bg-white p-6 text-center shadow-sm"
          >
            <div className="mb-2 text-3xl font-bold text-neutral-900 md:text-4xl">
              {stat.value}
            </div>
            <div className="text-sm text-neutral-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid gap-12 md:gap-16">
        {features.map((feature) => (
          <div
            key={feature.number}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            {/* Image on left for odd numbers, right for even */}
            {feature.number % 2 === 1 ? (
              <>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-xl font-bold text-white">
                    {feature.number}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="order-2 md:order-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-xl font-bold text-white">
                    {feature.number}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-neutral-600">
                    {feature.description}
                  </p>
                </div>
                <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 md:order-2">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

