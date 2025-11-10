export type NavigationLink = {
  label: string;
  href: string;
};

export type CallToAction = {
  label: string;
  href: string;
};

export type Logo = {
  src: string;
  alt: string;
};

export type HeroContent = {
  eyebrow?: string;
  title: string;
  description: string;
  actions: {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  image: {
    src: string;
    alt: string;
  };
};

export type ServiceContent = {
  title: string;
  description: string;
  tags: string[];
};

export type ProjectContent = {
  title: string;
  category: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  href: string;
};

export type ProcessStepContent = {
  id: number;
  title: string;
  description: string;
  deliverable: string;
};

export type TestimonialContent = {
  quote: string;
  author: {
    name: string;
    role: string;
  };
  company: string;
};

export type FooterGroup = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export type AIInsightsContent = {
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

export type AIActionsContent = {
  title: string;
  description: string;
  actions: {
    icon: string;
    title: string;
    description: string;
  }[];
  charts: {
    interestOverTime: string;
    peakUsageHeatmap: string;
    remixPageRank: {
      score: number;
      label: string;
    };
  };
};

export type MediaArticlesContent = {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  featured: {
    title: string;
    description: string;
    author: string;
    image: string;
    readTime: string;
  };
  articles: {
    title: string;
    image: string;
    readTime?: string;
  }[];
};

export type LeaderSpeakContent = {
  leader: {
    name: string;
    role: string;
    title: string;
    image: string;
    quote: string;
    context: string;
  };
  cta: {
    label: string;
    href: string;
  };
};

export type HomeContent = {
  navigation: {
    logo: Logo;
    links: NavigationLink[];
    cta: CallToAction;
  };
  hero: HeroContent;
  clients: { name: string }[];
  aiInsights: AIInsightsContent;
  aiActions: AIActionsContent;
  mediaArticles: MediaArticlesContent;
  leaderSpeak: LeaderSpeakContent;
  services: ServiceContent[];
  projects: ProjectContent[];
  processSteps: ProcessStepContent[];
  testimonials: TestimonialContent[];
  footer: {
    disclaimer: string;
    tagline?: string;
    groups: FooterGroup[];
    socials: SocialLink[];
  };
};

export function getHomeContent(): HomeContent {
  return {
    navigation: {
      logo: { src: "/assets/moor-logo.svg", alt: "Mooring logo" },
      links: [
        { label: "Technology", href: "#technology" },
        { label: "Team", href: "#team" },
        { label: "Media", href: "#media" },
        { label: "Partners", href: "#partners" },
      ],
      cta: { label: "Login", href: "#login" },
    },
    hero: {
      eyebrow: "",
      title: "Making the Website AI-Ready",
      description: "",
      actions: [
        { label: "CLICK NOW", href: "#get-started" },
      ],
      stats: [],
      image: {
        src: "/assets/ai-sphere.png",
        alt: "AI Neural Network Sphere",
      },
    },
    clients: [],
    aiInsights: {
      title: "Website AI Insights",
      description: "Assess, analyze, and optimize your tech stack for full AI readiness. We unveil the guesswork.",
      detailedDescription: "Evaluate your APIs, infrastructure, and integrations to convert your entire tech stack in structured, secure, and primed for seamless AI adoption — transforming your company into a fully AI-powered enterprise.",
      stats: [
        { value: "10+", label: "Integrations" },
        { value: "50k+", label: "Data Points Processed" },
        { value: "200+", label: "Best Docs" },
        { value: "<3s", label: "Response time" },
      ],
      features: [
        {
          number: 1,
          title: "Ask in natural language.",
          description: "Forget complex interfaces and technical jargon. Simply type or speak your question, and get instant, accurate insights from your API data in plain language.",
          image: "/assets/feature-laptop.png",
        },
        {
          number: 2,
          title: "Real-Time Metrics",
          description: "Stay on top of your API performance with live monitoring. Track response times, error rates, and uptime as they happen.",
          image: "/assets/feature-phone.png",
        },
        {
          number: 3,
          title: "Actionable Answers",
          description: "Stop sifting through endless logs. Receive concise summaries, visual breakdowns, and actionable recommendations you can act on at a glance — empowering your team to react fast.",
          image: "/assets/feature-dashboard.png",
        },
      ],
    },
    aiActions: {
      title: "AI ready actions",
      description: "Unlock your tech stack's AI-AI potential—instantly. Assess APIs, infrastructure, and integrations to spot gaps, automate recommendations, and pave the way for your company to become a fully AI-powered enterprise.",
      actions: [
        {
          icon: "chart",
          title: "Comprehensive Metrics",
          description: "Forget manual checks or scattered data. Simply enter your URL or codebase, accurately score your API performance, audit infrastructure scalability, and pinpoint vulnerabilities in one seamless AI-powered scan.",
        },
        {
          icon: "endpoint",
          title: "Endpoint AI Readiness",
          description: "See which endpoints are primed for AI agents. Identify security vulnerabilities or auth inconsistencies that could derail seamless AI connections and automation.",
        },
        {
          icon: "history",
          title: "Historical Analysis",
          description: "Track your tech stack's evolution over time, uncovering trends and patterns to make informed decisions that accelerate your transition to a full AI infrastructure.",
        },
        {
          icon: "roadmap",
          title: "Instant AI Roadmaps",
          description: "Get a clear, step-by-step AI readiness roadmap tailored to your stack. Receive actionable recommendations and personalized recommendations you can act on at a glance — empowering your team to react fast.",
        },
        {
          icon: "capability",
          title: "Capability Inference",
          description: "Power up your internal tech (e.g., Shopify, NetSuite, etc.) or other API capabilities. See exact routes, and ecosystem naturally integrate advanced AI agents for AI adoption.",
        },
      ],
      charts: {
        interestOverTime: "/assets/chart-interest.png",
        peakUsageHeatmap: "/assets/chart-heatmap.png",
        remixPageRank: { score: 54, label: "Remix Page Rank" },
      },
    },
    services: [],
    projects: [],
    mediaArticles: {
      title: "Media articles",
      description: "Insights and perspectives from industry leaders shaping the future of innovation.",
      cta: { label: "VIEW ALL →", href: "#all-articles" },
      featured: {
        title: "See how Moor is shaping the future of the AI web.",
        description: "A new outlook is transforming the way developers work with cutting-edge AI tools, making creative processes faster and smarter.",
        author: "Article by Evy Owens",
        image: "/assets/article-featured.png",
        readTime: "5 min read",
      },
      articles: [
        {
          title: "AI-powered tool for insights.",
          image: "/assets/article-1.png",
        },
        {
          title: "Local Entrepreneur driving change.",
          image: "/assets/article-2.png",
        },
        {
          title: "Helping small business go digital.",
          image: "/assets/article-3.png",
          readTime: "3 min read",
        },
      ],
    },
    leaderSpeak: {
      leader: {
        name: "Eric Dowski",
        role: "Chief Innovation Officer",
        title: "Technology Visionary",
        image: "/assets/Frame 1528231768.png",
        quote: "The future of AI isn't about replacing human creativity—it's about amplifying it. We're building tools that make innovation accessible to everyone.",
        context: "Eric has been at the forefront of AI transformation, helping over 500 companies integrate intelligent solutions into their workflows. His insights have shaped the way modern businesses approach digital innovation.",
      },
      cta: {
        label: "Read Full Interview",
        href: "#interview",
      },
    },
    processSteps: [],
    testimonials: [],
    footer: {
      disclaimer: "mooring | A TBL Company",
      tagline: "AI agents place work with webtools.",
      groups: [
        {
          title: "Moor",
          links: [
            { label: "Technology", href: "#technology" },
            { label: "Team", href: "#team" },
            { label: "Partners", href: "#partners" },
          ],
        },
        {
          title: "About",
          links: [
            { label: "About Us", href: "#about" },
            { label: "Media", href: "#media" },
            { label: "Careers", href: "#careers" },
          ],
        },
        {
          title: "Address",
          links: [
            { label: "1 Wallich Street, #14-01", href: "#" },
            { label: "HSBC Bank, Guoco Tower", href: "#" },
            { label: "India, 158813", href: "#" },
          ],
        },
      ],
      socials: [
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  };
}

