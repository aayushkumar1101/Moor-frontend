export function TermsContent() {
  return (
    <main className="bg-white flex-1">
      <div className="box-border content-stretch flex flex-col items-start px-[76px] py-[56px]">
        <div className="max-w-[1240px] mx-auto w-full">
          {/* Title Section */}
          <div className="content-stretch flex flex-col gap-[16px] items-start mb-[48px]">
            <p className="font-['Public_Sans:Bold',sans-serif] leading-[64px] text-[50px] text-[#1a1a1a]">
              Terms & Conditions
            </p>
            <p className="font-['Public_Sans:SemiBold',sans-serif] leading-[normal] text-[24px] text-[#1a1a1a] max-w-[834px]">
              The simple legal stuff — written in plain language.
            </p>
            <p className="font-['Public_Sans:Medium',sans-serif] leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]">
              By using Moor.ing, you agree to these terms. We keep it straightforward — no confusing legal talk.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="content-stretch flex flex-col gap-[32px] items-start">
            {/* Section 1 */}
            <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
              <p className="font-['Public_Sans:SemiBold',sans-serif] leading-[normal] text-[24px] text-[#1a1a1a]">
                Who We Are
              </p>
              <p className="font-['Public_Sans:Medium',sans-serif] leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]">
                Moor.ing is operated by T9L, with all payments securely processed by Media International Pvt. Ltd., a subsidiary of T9L.
              </p>
            </div>

            {/* Section 2 */}
            <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
              <p className="font-['Public_Sans:SemiBold',sans-serif] leading-[normal] text-[24px] text-[#1a1a1a]">
                Our Service
              </p>
              <p className="font-['Public_Sans:Medium',sans-serif] leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]">
                We help you create and download logos, brand kits, and related design assets — all digitally delivered.
              </p>
            </div>

            {/* Section 3 */}
            <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
              <p className="font-['Public_Sans:SemiBold',sans-serif] leading-[normal] text-[24px] text-[#1a1a1a]">
                Payments
              </p>
              <p className="font-['Public_Sans:Medium',sans-serif] leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]">
                All prices are in USD. Payments are securely handled through PayPal or card by Media International Pvt. Ltd. on behalf of Moor.ing.
              </p>
            </div>

            {/* Section 4 */}
            <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
              <p className="font-['Public_Sans:SemiBold',sans-serif] leading-[normal] text-[24px] text-[#1a1a1a]">
                Refunds
              </p>
              <p className="font-['Public_Sans:Medium',sans-serif] leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]">
                Since our products are digital, refunds aren't available after download. For access or technical issues, email{' '}
                <a href="mailto:support@moor.ing" className="text-[#00a7e6] hover:underline">
                  support@moor.ing
                </a>
                .
              </p>
            </div>

            {/* Section 5 */}
            <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
              <p className="font-['Public_Sans:SemiBold',sans-serif] leading-[normal] text-[24px] text-[#1a1a1a]">
                Usage Rights
              </p>
              <p className="font-['Public_Sans:Medium',sans-serif] leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]">
                You get full commercial rights to your purchased logos and brand kits once paid. Redistribution or resale is not allowed.
              </p>
            </div>

            {/* Section 6 */}
            <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
              <p className="font-['Public_Sans:SemiBold',sans-serif] leading-[normal] text-[24px] text-[#1a1a1a]">
                Liability
              </p>
              <p className="font-['Public_Sans:Medium',sans-serif] leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]">
                We're here to help you build your brand — but we can't be responsible for indirect losses. Our liability is limited to your purchase amount.
              </p>
            </div>

            {/* Section 7 */}
            <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
              <p className="font-['Public_Sans:SemiBold',sans-serif] leading-[normal] text-[24px] text-[#1a1a1a]">
                Updates
              </p>
              <p className="font-['Public_Sans:Medium',sans-serif] leading-[32px] text-[16px] text-[#4c4c6d] max-w-[834px]">
                We may update these terms as we grow; continued use means you're okay with the latest version.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e5e5e5] px-[76px] py-[40px]">
        <div className="max-w-[1240px] mx-auto">
          <p className="font-['Public_Sans:Regular',sans-serif] leading-[28px] text-[16px] text-[#4c4c6d] text-center">
            Operated by T9L Company
          </p>
        </div>
      </footer>
    </main>
  );
}