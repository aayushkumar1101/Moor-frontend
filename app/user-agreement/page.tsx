import Link from "next/link";

import { Header } from "@/components/homepage/Header";
import { FooterSection } from "@/components/homepage/Footer";

const PUBLIC_SANS = "'Public Sans', sans-serif";

const navLinkBase = {
  fontFamily: PUBLIC_SANS,
  fontWeight: 500,
  fontSize: "16px",
} as const;

const titleStyle = {
  fontFamily: PUBLIC_SANS,
  fontWeight: 700,
} as const;

const subtitleStyle = {
  fontFamily: PUBLIC_SANS,
  fontWeight: 600,
} as const;

const bodyStyle = {
  fontFamily: PUBLIC_SANS,
  fontWeight: 500,
} as const;

const footerStyle = {
  fontFamily: PUBLIC_SANS,
  fontWeight: 400,
} as const;

export const metadata = {
  title: "Terms & Conditions | Mooring",
  description:
    "Review Mooring's user agreement outlining our services, payment policies, usage rights, liability, and updates.",
};

export default function UserAgreementPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 bg-white">
        <nav className="bg-white border-b border-[#e5e5e5] px-[76px] py-[24px]">
          <div className="mx-auto flex max-w-[1240px] gap-[24px]">
            <Link
              href="/user-agreement"
              aria-current="page"
              className="transition-colors hover:text-[#00a7e6]"
              style={{ ...navLinkBase, color: "#00a7e6" }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#00a7e6]"
              style={{ ...navLinkBase, color: "#4c4c6d" }}
            >
              Privacy Policy
            </Link>
          </div>
        </nav>

        <div className="bg-white">
          <div className="box-border flex flex-col items-start px-[76px] py-[56px]">
            <div className="mx-auto w-full max-w-[1240px]">
              <div className="mb-[48px] flex flex-col items-start gap-[16px]">
                <p className="leading-[64px] text-[50px] text-[#1a1a1a]" style={titleStyle}>
                  Terms &amp; Conditions
                </p>
                <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                  The simple legal stuff — written in plain language.
                </p>
                <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                  By using Moor.ing, you agree to these terms. We keep it straightforward — no confusing legal talk.
                </p>
              </div>

              <div className="flex flex-col items-start gap-[32px]">
                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Who We Are
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Moor.ing is operated by T9L, with all payments securely processed by Media International Pvt. Ltd., a
                    subsidiary of T9L.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Our Service
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    We help you create and download logos, brand kits, and related design assets — all digitally delivered.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Payments
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    All prices are in USD. Payments are securely handled through PayPal or card by Media International Pvt. Ltd.
                    on behalf of Moor.ing.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Refunds
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Since our products are digital, refunds aren&apos;t available after download. For access or technical issues,
                    email{" "}
                    <a href="mailto:support@moor.ing" className="text-[#00a7e6] hover:underline">
                      support@moor.ing
                    </a>
                    .
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Usage Rights
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    You get full commercial rights to your purchased logos and brand kits once paid. Redistribution or resale is
                    not allowed.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Liability
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    We&apos;re here to help you build your brand — but we can&apos;t be responsible for indirect losses. Our
                    liability is limited to your purchase amount.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Updates
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    We may update these terms as we grow; continued use means you&apos;re okay with the latest version.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="border-t border-[#e5e5e5] px-[76px] py-[40px]">
            <div className="mx-auto max-w-[1240px]">
              <p className="text-center text-[16px] leading-[28px] text-[#4c4c6d]" style={footerStyle}>
                Operated by T9L Company
              </p>
            </div>
          </footer>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

