import Image from "next/image";
import { SectionHeading, SectionHeadingProps } from "./SectionHeading";

export type Testimonial = {
  quote: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  company: string;
};

export type TestimonialsProps = {
  heading: SectionHeadingProps;
  testimonials: Testimonial[];
};

export function Testimonials({ heading, testimonials }: TestimonialsProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:px-12 md:py-24">
      <SectionHeading {...heading} />

      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={`${testimonial.author.name}-${testimonial.company}`}
            className="flex h-full flex-col gap-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.4)]"
          >
            <blockquote className="text-base leading-relaxed text-neutral-700">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-4">
              {testimonial.author.avatar ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-neutral-100">
                  <Image
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold uppercase text-white">
                  {testimonial.author.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-900">
                  {testimonial.author.name}
                </span>
                <span className="text-xs text-neutral-500">
                  {testimonial.author.role} · {testimonial.company}
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

