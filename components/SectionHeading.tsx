export type SectionHeadingProps = {
  /**
   * Uppercase label displayed above the title. Useful for section grouping.
   */
  eyebrow?: string;
  /**
   * Primary section title.
   */
  title: string;
  /**
   * Supporting copy that explains the section.
   */
  description?: string;
  /**
   * Align content centrally when `true`; otherwise left-align.
   */
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";

  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-neutral-600 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

