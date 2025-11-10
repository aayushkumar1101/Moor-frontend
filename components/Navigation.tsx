import Image from "next/image";
import Link from "next/link";

export type NavLink = {
  label: string;
  href: string;
};

export type NavigationProps = {
  logo: {
    src: string;
    alt: string;
  };
  links: NavLink[];
  cta?: {
    label: string;
    href: string;
  };
};

export function Navigation({ logo, links, cta }: NavigationProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/75 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-8 px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-36">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="(max-width: 768px) 144px, 180px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-700 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-neutral-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {cta ? (
          <Link
            href={cta.href}
            className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
          >
            {cta.label}
          </Link>
        ) : (
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 md:hidden"
            aria-label="Open navigation menu"
          >
            <span className="sr-only">Open navigation menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

