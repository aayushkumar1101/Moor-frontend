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
  title: "Privacy Policy | Mooring",
  description:
    "Learn how Mooring collects, uses, and protects your personal information, including payment security and data rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 bg-white">
        <nav className="bg-white border-b border-[#e5e5e5] px-[76px] py-[24px]">
          <div className="mx-auto flex max-w-[1240px] gap-[24px]">
            <Link
              href="/user-agreement"
              className="transition-colors hover:text-[#00a7e6]"
              style={{ ...navLinkBase, color: "#4c4c6d" }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy-policy"
              aria-current="page"
              className="transition-colors hover:text-[#00a7e6]"
              style={{ ...navLinkBase, color: "#00a7e6" }}
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
                  Privacy Policy
                </p>
                <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                  Your data. Protected and private — always.
                </p>
              </div>

              <div className="flex flex-col items-start gap-[32px]">
                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Who Handles Your Info
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Moor.ing runs under T9L, and payments are securely managed by Media International Pvt. Ltd., a T9L subsidiary.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    What We Collect
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Name, email, payment info (via PayPal/card), and some basic usage data.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Why We Collect It
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    To process your payment, send your logo assets, and improve your experience.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    What We Don&apos;t Do
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    We don&apos;t sell your data, and we don&apos;t store full card details. Ever.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Security
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Every transaction runs on SSL encryption and protected HTTPS.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Cookies
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Used to make the site work better; disable them anytime in your browser.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Your Rights
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    You can edit or delete your info anytime — email{" "}
                    <a href="mailto:privacy@moor.ing" className="text-[#00a7e6] hover:underline">
                      privacy@moor.ing
                    </a>
                    .
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Policy Updates
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    When we change something, we&apos;ll post it here first.
                  </p>
                </div>

                <div className="my-[16px] h-[1px] w-full bg-[#e5e5e5]" />

                <div className="mt-[16px] flex w-full flex-col items-start gap-[16px]">
                  <p className="leading-[64px] text-[50px] text-[#1a1a1a]" style={titleStyle}>
                    Payment &amp; Security
                  </p>
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Simple, safe, and secure — just how payments should be.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Who Handles Payments
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    All transactions are processed by Media International Pvt. Ltd., a T9L subsidiary, on behalf of Moor.ing.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Encryption
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Every transaction is protected by 256-bit SSL encryption — the same level used by global financial platforms.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Compliance
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    All processors are PCI-DSS compliant and meet industry standards for security.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Data Privacy
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    We never store or access your full card details.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Fraud Protection
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Continuous monitoring keeps your data safe from unauthorized access.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Trusted Checkout
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Always look for &quot;https://&quot; and the lock icon in your browser before you pay.
                  </p>
                </div>

                <div className="flex w-full flex-col items-start gap-[12px]">
                  <p className="text-[24px] text-[#1a1a1a]" style={subtitleStyle}>
                    Need Help?
                  </p>
                  <p className="leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]" style={bodyStyle}>
                    Reach us anytime at{" "}
                    <a href="mailto:support@moor.ing" className="text-[#00a7e6] hover:underline">
                      support@moor.ing
                    </a>
                    .
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


