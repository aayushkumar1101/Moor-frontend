import { SectionHeading, SectionHeadingProps } from "./SectionHeading";

export type ProcessStep = {
  id: number;
  title: string;
  description: string;
  deliverable: string;
};

export type ProcessTimelineProps = {
  heading: SectionHeadingProps;
  steps: ProcessStep[];
};

export function ProcessTimeline({ heading, steps }: ProcessTimelineProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:px-12 md:py-24">
      <SectionHeading {...heading} />

      <ol className="relative grid gap-10 rounded-[2.5rem] border border-neutral-200 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.4)] before:absolute before:left-10 before:top-10 before:bottom-10 before:w-px before:bg-neutral-200 sm:before:left-12 lg:grid-cols-2 lg:before:hidden">
        {steps.map((step) => (
          <li key={step.id} className="relative pl-12 sm:pl-16 lg:pl-12">
            <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-sky-600 bg-white font-semibold text-sky-600 shadow">
              {step.id}
            </div>
            <div className="flex flex-col gap-3 rounded-3xl border border-transparent p-4 transition hover:border-neutral-200 hover:bg-neutral-50">
              <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-600">{step.description}</p>
              <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                Deliverable · {step.deliverable}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

