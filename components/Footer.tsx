import Link from "next/link";

export type FooterLinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};

export type FooterProps = {
  disclaimer?: string;
  tagline?: string;
  groups: FooterLinkGroup[];
  socials?: { label: string; href: string }[];
};

export function Footer({ disclaimer, tagline, groups, socials = [] }: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[2fr,3fr]">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold text-neutral-900">mooring</span>
            {tagline && (
              <p className="text-sm text-neutral-600">
                {tagline}
              </p>
            )}
            {socials.length ? (
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    className="inline-flex items-center text-neutral-600 transition hover:text-neutral-900"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-neutral-900">
                  {group.title}
                </span>
                <div className="flex flex-col gap-3 text-sm text-neutral-600">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition hover:text-neutral-900"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          {disclaimer ? <span>{disclaimer}</span> : null}
        </div>
      </div>
    </footer>
  );
}

