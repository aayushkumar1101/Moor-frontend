"use client";

import Image from "next/image";
import { useState } from "react";

export function AIReadinessSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedActions, setExpandedActions] = useState<number[]>([]);

  const toggleAction = (index: number) => {
    setExpandedActions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const actions = [
    {
      icon: (
        <svg width="31" height="35" viewBox="0 0 31 35" fill="none">
          <path d="M27.3333 29H4.66667V6.33333C4.66667 5.97971 4.52619 5.64057 4.27614 5.39052C4.02609 5.14048 3.68696 5 3.33333 5C2.97971 5 2.64057 5.14048 2.39052 5.39052C2.14048 5.64057 2 5.97971 2 6.33333V30.3333C2 30.687 2.14048 31.0261 2.39052 31.2761C2.64057 31.5262 2.97971 31.6667 3.33333 31.6667H27.3333C27.687 31.6667 28.0261 31.5262 28.2761 31.2761C28.5262 31.0261 28.6667 30.687 28.6667 30.3333C28.6667 29.9797 28.5262 29.6406 28.2761 29.3905C28.0261 29.1405 27.687 29 27.3333 29ZM9.33333 23.6667C9.86377 23.6667 10.3725 23.456 10.7475 23.0809C11.1226 22.7058 11.3333 22.1971 11.3333 21.6667C11.3383 21.6001 11.3383 21.5332 11.3333 21.4667L15.0533 17.7467H15.6667L17.8133 19.8933V20C17.8133 20.5304 18.024 21.0391 18.3991 21.4142C18.7742 21.7893 19.2829 22 19.8133 22C20.3438 22 20.8525 21.7893 21.2275 21.4142C21.6026 21.0391 21.8133 20.5304 21.8133 20V19.8933L26.6667 15C27.0622 15 27.4489 14.8827 27.7778 14.6629C28.1067 14.4432 28.363 14.1308 28.5144 13.7654C28.6658 13.3999 28.7054 12.9978 28.6282 12.6098C28.5511 12.2219 28.3606 11.8655 28.0809 11.5858C27.8012 11.3061 27.4448 11.1156 27.0568 11.0384C26.6689 10.9613 26.2668 11.0009 25.9013 11.1522C25.5358 11.3036 25.2235 11.56 25.0037 11.8889C24.784 12.2178 24.6667 12.6044 24.6667 13C24.6617 13.0666 24.6617 13.1334 24.6667 13.2L19.8533 18.0133H19.64L17.3333 15.6667C17.3333 15.1362 17.1226 14.6275 16.7475 14.2525C16.3725 13.8774 15.8638 13.6667 15.3333 13.6667C14.8029 13.6667 14.2942 13.8774 13.9191 14.2525C13.544 14.6275 13.3333 15.1362 13.3333 15.6667L9.33333 19.6667C8.8029 19.6667 8.29419 19.8774 7.91912 20.2525C7.54405 20.6275 7.33333 21.1362 7.33333 21.6667C7.33333 22.1971 7.54405 22.7058 7.91912 23.0809C8.29419 23.456 8.8029 23.6667 9.33333 23.6667Z" fill="currentColor"/>
        </svg>
      ),
      title: "Comprehensive Metrics",
      description:
        "Forget manual checks or outdated audits. Simply enter your URL for instant, accurate scores on API presence, auth maturity, infrastructure scalability, and integration readiness—guiding your path to AI optimization.",
    },
    {
      icon: (
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
          <path d="M30 19.3072V16.7059H24.6563V10.2026H25.9889V5H20.6585V10.2026H21.9911V16.7059H6V19.3072H11.317V25.7974H9.98445V31H15.3015V25.7974H13.9689V19.3072H30Z" fill="currentColor"/>
        </svg>
      ),
      title: "Endpoint AI Readiness",
      description:
        "See which endpoints are primed for AI agents, identify security vulnerabilities or auth weaknesses, and discover where enhancements can enable seamless AI connections and automation.",
    },
    {
      icon: (
        <svg width="35" height="38" viewBox="0 0 35 38" fill="none">
          <path d="M5.10547 5V13.75H2.1888V5H5.10547ZM2.1888 34.1667V25.4167H5.10547V34.1667H2.1888ZM6.5638 19.5833C6.5638 21.2021 5.26589 22.5 3.64714 22.5C3.07027 22.5 2.50637 22.3289 2.02672 22.0085C1.54708 21.688 1.17324 21.2324 0.952488 20.6995C0.731732 20.1665 0.673973 19.5801 0.786513 19.0143C0.899053 18.4485 1.17684 17.9288 1.58474 17.5209C1.99265 17.113 2.51235 16.8352 3.07812 16.7227C3.6439 16.6102 4.23035 16.6679 4.7633 16.8887C5.29625 17.1094 5.75177 17.4833 6.07226 17.9629C6.39274 18.4426 6.5638 19.0065 6.5638 19.5833ZM22.6055 7.91667C29.0513 7.91667 34.2721 13.1375 34.2721 19.5833C34.2721 26.0292 29.0513 31.25 22.6055 31.25C17.3555 31.25 12.9221 27.7792 11.4492 23.0104L8.02214 19.5833L11.4492 16.1562C12.9221 11.3875 17.3555 7.91667 22.6055 7.91667ZM22.6055 10.8333C17.7784 10.8333 13.8555 14.7562 13.8555 19.5833C13.8555 24.4104 17.7784 28.3333 22.6055 28.3333C27.4326 28.3333 31.3555 24.4104 31.3555 19.5833C31.3555 14.7562 27.4326 10.8333 22.6055 10.8333ZM21.1471 21.0417V13.75H23.3346V19.875L27.7096 22.5L26.5138 24.3375L21.1471 21.0417Z" fill="currentColor"/>
        </svg>
      ),
      title: "Historical AI Analysis",
      description:
        "Track your tech stack's AI evolution over time, uncovering trends and patterns to make informed decisions that accelerate your transition to a full AI enterprise.",
    },
    {
      icon: (
        <svg width="32" height="37" viewBox="0 0 32 37" fill="none">
          <path d="M19 5C19.2652 5 19.5196 5.10536 19.7071 5.29289C19.8946 5.48043 20 5.73478 20 6C20 6.26522 20.1054 6.51957 20.2929 6.70711C20.4804 6.89464 20.7348 7 21 7C21.2652 7 21.5196 7.10536 21.7071 7.29289C21.8946 7.48043 22 7.73478 22 8V9C22 9.26522 21.8946 9.51957 21.7071 9.70711C21.5196 9.89464 21.2652 10 21 10H11C10.7348 10 10.4804 9.89464 10.2929 9.70711C10.1054 9.51957 10 9.26522 10 9V8C10 7.73478 10.1054 7.48043 10.2929 7.29289C10.4804 7.10536 10.7348 7 11 7C11.2652 7 11.5196 6.89464 11.7071 6.70711C11.8946 6.51957 12 6.26522 12 6C12 5.73478 12.1054 5.48043 12.2929 5.29289C12.4804 5.10536 12.7348 5 13 5H19Z" fill="currentColor"/>
          <path d="M6 10C6 9.73478 6.10536 9.48043 6.29289 9.29289C6.48043 9.10536 6.73478 9 7 9H8C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7H7C6.20435 7 5.44129 7.31607 4.87868 7.87868C4.31607 8.44129 4 9.20435 4 10V34C4 34.7956 4.31607 35.5587 4.87868 36.1213C5.44129 36.6839 6.20435 37 7 37H25C25.7956 37 26.5587 36.6839 27.1213 36.1213C27.6839 35.5587 28 34.7956 28 34V10C28 9.20435 27.6839 8.44129 27.1213 7.87868C26.5587 7.31607 25.7956 7 25 7H24C23.7348 7 23.4804 7.10536 23.2929 7.29289C23.1054 7.48043 23 7.73478 23 8C23 8.26522 23.1054 8.51957 23.2929 8.70711C23.4804 8.89464 23.7348 9 24 9H25C25.2652 9 25.5196 9.10536 25.7071 9.29289C25.8946 9.48043 26 9.73478 26 10V34C26 34.2652 25.8946 34.5196 25.7071 34.7071C25.5196 34.8946 25.2652 35 25 35H7C6.73478 35 6.48043 34.8946 6.29289 34.7071C6.10536 34.5196 6 34.2652 6 34V10Z" fill="currentColor"/>
          <path d="M20 19C20 18.4696 20.2107 17.9609 20.5858 17.5858C20.9609 17.2107 21.4696 17 22 17C22.5304 17 23.0391 17.2107 23.4142 17.5858C23.7893 17.9609 24 18.4696 24 19V29C24 29.5304 23.7893 30.0391 23.4142 30.4142C23.0391 30.7893 22.5304 31 22 31C21.4696 31 20.9609 30.7893 20.5858 30.4142C20.2107 30.0391 20 29.5304 20 29V19ZM8 27C8 26.4696 8.21071 25.9609 8.58579 25.5858C8.96086 25.2107 9.46957 25 10 25C10.5304 25 11.0391 25.2107 11.4142 25.5858C11.7893 25.9609 12 26.4696 12 27V29C12 29.5304 11.7893 30.0391 11.4142 30.4142C11.0391 30.7893 10.5304 31 10 31C9.46957 31 8.96086 30.7893 8.58579 30.4142C8.21071 30.0391 8 29.5304 8 29V27ZM16 21C15.4696 21 14.9609 21.2107 14.5858 21.5858C14.2107 21.9609 14 22.4696 14 23V29C14 29.5304 14.2107 30.0391 14.5858 30.4142C14.9609 30.7893 15.4696 31 16 31C16.5304 31 17.0391 30.7893 17.4142 30.4142C17.7893 30.0391 18 29.5304 18 29V23C18 22.4696 17.7893 21.9609 17.4142 21.5858C17.0391 21.2107 16.5304 21 16 21Z" fill="currentColor"/>
        </svg>
      ),
      title: "Instant AI Roadmaps",
      description:
        "Complex tech data transformed into concise, readable summaries and personalized recommendations you can act on at a glance—empowering your team to build an AI-ready stack.",
    },
    {
      icon: (
        <svg width="33" height="37" viewBox="0 0 33 37" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M16.5 7.23173C14.4291 7.23212 12.4071 7.85007 10.7015 9.00386C8.99592 10.1576 7.68704 11.7929 6.94804 13.6933C6.20904 15.5937 6.07473 17.6697 6.56288 19.6467C7.05102 21.6238 8.13863 23.4086 9.68182 24.7652L9.68637 24.7712C10.5303 25.5139 11.1712 26.0765 11.6288 26.4903C12.0606 26.8773 12.4015 27.1958 12.5818 27.4131L12.6 27.4355C12.9364 27.8418 13.2273 28.196 13.4212 28.6202C13.6136 29.0429 13.6864 29.4939 13.7712 30.0104L13.7758 30.0402C13.8197 30.3051 13.8364 30.6296 13.8439 31.0463H19.1561C19.1636 30.6296 19.1803 30.3051 19.2242 30.0402L19.2288 30.0104C19.3136 29.4939 19.3864 29.0429 19.5788 28.6202C19.7727 28.196 20.0636 27.8418 20.4 27.4355L20.4182 27.4131C20.5985 27.1958 20.9394 26.8773 21.3712 26.4903C21.8288 26.0765 22.4697 25.5139 23.3136 24.7712L23.3197 24.7652C24.863 23.4085 25.9506 21.6235 26.4387 19.6464C26.9268 17.6692 26.7924 15.5931 26.0532 13.6926C25.314 11.7921 24.0049 10.1569 22.2991 9.00322C20.5932 7.84955 18.571 7.23181 16.5 7.23173ZM19.1424 33.279H13.8576C13.8636 33.4328 13.8717 33.5702 13.8818 33.6913C13.9121 34.0261 13.9652 34.1482 14.0015 34.2092C14.1011 34.3785 14.2443 34.5192 14.4167 34.6171C14.4773 34.6528 14.603 34.7034 14.9439 34.7346C15.3 34.7659 15.7712 34.7674 16.5 34.7674C17.2288 34.7674 17.7 34.7674 18.0561 34.7346C18.397 34.7049 18.5212 34.6528 18.5833 34.6171C18.7557 34.5192 18.8989 34.3785 18.9985 34.2092C19.0349 34.1497 19.0879 34.0261 19.1182 33.6913C19.1283 33.5702 19.1364 33.4328 19.1424 33.279ZM4.00001 17.2785C4.00016 15.2304 4.52179 13.2149 5.5174 11.4155C6.51302 9.61601 7.95099 8.08977 9.70042 6.97568C11.4498 5.86159 13.4552 5.19505 15.5338 5.03674C17.6124 4.87843 19.6983 5.23338 21.6017 6.06926C23.505 6.90515 25.1652 8.19543 26.4313 9.82264C27.6974 11.4498 28.529 13.3623 28.8505 15.3859C29.172 17.4095 28.9731 19.4799 28.272 21.4087C27.5709 23.3375 26.3899 25.0634 24.8364 26.4293C24.19 26.9947 23.5466 27.5632 22.9061 28.135C22.6798 28.3392 22.4576 28.5476 22.2394 28.7601L22.1848 28.8182C21.7909 29.296 21.7045 29.4195 21.6545 29.5311C21.603 29.6428 21.5667 29.7871 21.4682 30.3944C21.4288 30.6341 21.4242 31.0449 21.4242 32.1627V32.2103C21.4242 32.8652 21.4242 33.4308 21.3818 33.8922C21.3364 34.3834 21.2364 34.8686 20.9682 35.3255C20.6689 35.835 20.2383 36.258 19.7197 36.552C19.2545 36.8154 18.7606 36.9137 18.2621 36.9583C17.7894 37 17.2152 37 16.55 37H16.4515C15.7849 37 15.2091 37 14.7394 36.9583C14.2394 36.9137 13.7455 36.8154 13.2803 36.552C12.7617 36.258 12.3311 35.835 12.0318 35.3255C11.7636 34.8686 11.6636 34.3834 11.6182 33.8937C11.5758 33.4293 11.5758 32.8652 11.5758 32.2118V32.1627C11.5758 31.0463 11.5712 30.6341 11.5318 30.3944C11.4333 29.7871 11.3955 29.6428 11.3455 29.5311C11.2955 29.4195 11.2091 29.296 10.8152 28.8167L10.8 28.8018L10.7606 28.7587L10.6136 28.6143C10.4427 28.4522 10.2694 28.2924 10.0939 28.135C9.64698 27.7331 9.01516 27.178 8.16364 26.4293C6.85205 25.2786 5.80304 23.8685 5.08546 22.2914C4.36788 20.7143 3.99797 19.006 4.00001 17.2785ZM13.3061 23.0089C13.4353 22.9355 13.578 22.8878 13.726 22.8685C13.874 22.8493 14.0244 22.8588 14.1686 22.8967C14.3128 22.9346 14.448 23 14.5665 23.0892C14.685 23.1785 14.7844 23.2897 14.8591 23.4167C15.0252 23.6999 15.2644 23.9351 15.5524 24.0986C15.8405 24.2621 16.1673 24.3482 16.5 24.3482C16.8327 24.3482 17.1595 24.2621 17.4476 24.0986C17.7356 23.9351 17.9748 23.6999 18.1409 23.4167C18.2157 23.2898 18.3153 23.1786 18.4338 23.0894C18.5524 23.0002 18.6877 22.9349 18.832 22.8971C18.9763 22.8593 19.1267 22.8498 19.2747 22.8691C19.4228 22.8884 19.5655 22.9362 19.6947 23.0097C19.8239 23.0831 19.9372 23.1809 20.0279 23.2974C20.1187 23.4139 20.1852 23.5468 20.2237 23.6885C20.2622 23.8303 20.2719 23.9781 20.2522 24.1235C20.2325 24.2689 20.1839 24.4091 20.1091 24.536C19.5654 25.4571 18.6788 26.1348 17.6364 26.4263V28.4416C17.6364 28.7377 17.5166 29.0216 17.3035 29.231C17.0904 29.4403 16.8014 29.5579 16.5 29.5579C16.1986 29.5579 15.9096 29.4403 15.6965 29.231C15.4834 29.0216 15.3636 28.7377 15.3636 28.4416V26.4263C14.3212 26.1348 13.4346 25.4571 12.8909 24.536C12.8162 24.4091 12.7676 24.2689 12.748 24.1235C12.7284 23.9781 12.7381 23.8304 12.7767 23.6887C12.8153 23.547 12.8819 23.4142 12.9727 23.2978C13.0635 23.1814 13.1768 23.0823 13.3061 23.0089Z" fill="currentColor"/>
        </svg>
      ),
      title: "Capability Inference",
      description:
        "Based on your detected tech (e.g., Shopify, Next.js), we infer API capabilities, auth modes, and ecosystem maturity to provide tailored insights for AI adoption.",
    },
  ];

  return (
    <section className={`bg-white transition-all ${isExpanded ? "py-12 sm:py-16 md:py-20" : "py-8 md:py-20"}`}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Header with Icon and Toggle */}
        <div className={`${isExpanded ? "mb-8 md:mb-12" : "mb-0 md:mb-12"}`}>
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#1a1a1a]">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-[24px] font-bold leading-tight text-[#1a1a1a] sm:text-[32px] md:text-[40px]">
                AI-Ready Actions
              </h2>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[#4c4c6d] sm:text-base md:text-lg">
            Unlock your tech stack's full AI potential—instantly. Assess APIs, infrastructure, and integrations to spot gaps.
          </p>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#00a7e6] hover:text-[#0096d1] md:hidden"
          >
            <span>{isExpanded ? "Less" : "More"}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            >
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Expandable Content */}
        <div className={`${!isExpanded ? "hidden md:block" : ""}`}>
          {/* Desktop Header */}
          <div className="mb-12 hidden md:block">
            <h3 className="mb-6 text-[48px] font-bold leading-[56px] text-[#1a1a1a]">
              AI Readiness Insights, Made Simple
            </h3>
            <p className="max-w-3xl text-base font-normal leading-[28px] text-[#4c4c6d]">
              Unlock your tech stack's full AI potential—instantly. Assess APIs, infrastructure, and integrations to spot gaps, get actionable recommendations, and pave the way for your company to become a fully AI-powered enterprise—without complex audits or guesswork.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:grid-cols-[50%,1fr]">
            {/* Left: Actions List */}
            <div className="space-y-4 md:space-y-8 lg:space-y-12">
              {actions.map((action, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 md:border-none md:pb-0">
                  {/* Mobile: Collapsible Action */}
                  <button
                    onClick={() => toggleAction(index)}
                    className="flex w-full items-start gap-3 text-left md:pointer-events-none md:gap-4 lg:gap-5"
                  >
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-[#1a1a1a] md:h-9 md:w-9">
                      {action.icon}
                    </div>
                    <div className="flex-1 space-y-1 md:space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold leading-tight text-[#1a1a1a] sm:text-lg md:text-xl">
                          {action.title}
                        </h3>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={`ml-2 flex-shrink-0 text-[#4c4c6d] transition-transform md:hidden ${
                            expandedActions.includes(index) ? "rotate-180" : ""
                          }`}
                        >
                          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className={`text-sm font-normal leading-relaxed text-[#4c4c6d] sm:text-base sm:leading-[28px] ${
                        expandedActions.includes(index) ? "block" : "hidden md:block"
                      }`}>
                        {action.description}
                      </p>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Charts Group Visualization */}
            <div className="flex items-center justify-center">
              <Image
                src="/assets/Group 1000016181.png"
                alt="AI Readiness Charts - Interest over time, Peak usage heatmap, and Status score"
                width={600}
                height={900}
                className="h-auto w-full max-w-[280px] sm:max-w-[400px] md:max-w-[600px] object-contain"
              />
            </div>
          </div>

          {/* Mobile Extended Description */}
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#4c4c6d] md:hidden">
            <p>
              Get actionable recommendations and pave the way for your company to become a fully AI-powered enterprise—without complex audits or guesswork.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
