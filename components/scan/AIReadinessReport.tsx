"use client";

import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { InputError } from "@/components/ui/ErrorMessage";
import Toast from "@/components/ui/Toast";
import useFormValidation from "@/hooks/useFormValidation";
import { ComprehensiveAnalysisResponse, DataSummary, HostingProfile } from "@/types/analysis";

interface AIReadinessReportProps {
  url: string;
  analysis: ComprehensiveAnalysisResponse;
}

type DetailEntry = {
  label: string;
  value: string;
  multiline?: boolean;
};

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  score: number;
  maxScore: number;
  items: string[];
  bgColor: string;
  delay: number;
  details: DetailEntry[];
}

const SCORE_RING_CIRCUMFERENCE = 2 * Math.PI * 85;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL.trim().replace(/\/$/, "")
  : undefined;
const WAITLIST_ENDPOINT = API_BASE_URL ? `${API_BASE_URL}/api/waitlist` : undefined;

const ensureItems = (items: Array<string | null | undefined>): string[] => {
  const filtered = items.filter((item): item is string => Boolean(item?.trim()));
  if (filtered.length === 0) {
    filtered.push("No insights captured yet.");
  }
  return filtered;
};

const clampScore = (value?: number | null): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }
  return Math.min(100, Math.max(0, Math.round(value)));
};

const formatDuration = (value?: number | null): string => {
  if (value === null || value === undefined) {
    return "—";
  }
  return `${value.toFixed(2)} sec`;
};

const formatDateTime = (value?: string | null): string => {
  if (!value) {
    return "—";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const extractMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const data = payload as Record<string, unknown>;
  const candidates = ["error", "detail", "message"];

  for (const key of candidates) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const first = data.errors[0];
    if (typeof first === "string" && first.trim()) {
      return first;
    }
    if (first && typeof first === "object") {
      const nested = extractMessage(first);
      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
};

const getScoreStatus = (score: number) => {
  if (score > 70) {
    return {
      label: "Success",
      color: "text-[#22c55e]",
      meterColor: "#22c55e",
      description: "Great foundation. Keep iterating to stay ahead.",
    };
  }
  if (score >= 31) {
    return {
      label: "Moderate",
      color: "text-[#facc15]",
      meterColor: "#facc15",
      description: "Solid progress. Address the highlighted gaps to unlock full readiness.",
    };
  }
  return {
    label: "High Risk",
    color: "text-[#ef4444]",
    meterColor: "#ef4444",
    description: "Critical improvements recommended to make the stack AI compatible.",
  };
};

const NOT_AVAILABLE = "—";

const formatScoreValue = (value?: number | null) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return NOT_AVAILABLE;
  }
  return `${Math.round(Number(value))} / 100`;
};

const formatTextValue = (value?: string | number | null) => {
  if (value === null || value === undefined) {
    return NOT_AVAILABLE;
  }
  const stringValue = String(value).trim();
  return stringValue.length > 0 ? stringValue : NOT_AVAILABLE;
};

const formatBooleanValue = (value?: boolean | null) => {
  if (value === null || value === undefined) {
    return NOT_AVAILABLE;
  }
  return value ? "Yes" : "No";
};

const formatListValue = (value?: string[] | null) => {
  if (!value || value.length === 0) {
    return NOT_AVAILABLE;
  }
  return value.join("\n");
};

const formatCountLabel = (count: number, singular: string, plural?: string) => {
  const label = count === 1 ? singular : plural ?? `${singular}s`;
  return `${count} ${label}`;
};

const summarizeList = (items: string[], label: string, maxPreview = 2) => {
  if (!items.length) {
    return null;
  }

  const preview = items.slice(0, maxPreview).join(", ");
  const remaining = items.length - maxPreview;
  const suffix = remaining > 0 ? ` +${remaining}` : "";

  return `${label}: ${preview}${suffix}`;
};

const formatKeyValueObject = (value?: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return NOT_AVAILABLE;
  }

  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([_, v]) => typeof v === "string" && v.trim().length > 0)
    .map(([key, v]) => `${key}: ${String(v)}`);

  if (entries.length === 0) {
    return NOT_AVAILABLE;
  }

  return entries.join("\n");
};

const sanitizeHostingValue = (value?: string | null) => {
  if (!value) {
    return "";
  }
  const trimmed = value.trim();
  const normalized = trimmed.toLowerCase();
  if (
    !trimmed ||
    normalized === "unknown" ||
    normalized === "n/a" ||
    normalized === "na" ||
    normalized === "none"
  ) {
    return "";
  }
  return trimmed;
};

function MetricCard({ icon, title, score, maxScore, items, bgColor, delay, details }: MetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipId = `metric-detail-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [cursorX, setCursorX] = useState<number | null>(null);

  const centerTooltip = () => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) {
      setCursorX(null);
      return;
    }
    setCursorX(rect.width / 2);
  };

  const handleMouseEnter = () => {
    centerTooltip();
    setTooltipVisible(true);
  };

  const handleMouseMove = () => {
    // Intentionally left blank to keep tooltip centered without following the cursor.
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
    setCursorX(null);
  };

  const handleFocus = () => {
    centerTooltip();
    setTooltipVisible(true);
  };

  const handleBlur = () => {
    setTooltipVisible(false);
    setCursorX(null);
  };

  const handleTouchStart = () => {
    centerTooltip();
    setTooltipVisible(true);
  };

  const handleTouchMove = () => {
    // Tooltip remains centered during touch move to avoid following the finger.
  };

  const handleTouchEnd = () => {
    setTooltipVisible(false);
    setCursorX(null);
  };

  const tooltipLeft = cursorX !== null ? `${cursorX}px` : "50%";
  const tooltipStyle: CSSProperties = {
    left: tooltipLeft,
    top: "calc(100% - 12px)",
    transform: tooltipVisible
      ? "translateX(-50%) translateY(0)"
      : "translateX(-50%) translateY(-8px)",
    opacity: tooltipVisible ? 1 : 0,
    pointerEvents: tooltipVisible ? "auto" : "none",
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        ref={cardRef}
        className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in-up hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a7e6] focus-visible:ring-offset-2"
        style={{ animationDelay: `${delay}ms` }}
        tabIndex={0}
        aria-describedby={details.length ? tooltipId : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0`}>
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">{title}</h3>
          </div>
          <div className="text-2xl font-bold text-[#1a1a1a]">
            {score}
            <span className="text-base text-[#4c4c6d] font-normal">/{maxScore}</span>
          </div>
        </div>
        <div
          className={
            items.length > 3
              ? "max-h-[6.75rem] overflow-y-auto pr-1 custom-scrollbar"
              : undefined
          }
        >
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[#4c4c6d]">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {details.length ? (
        <div
          id={tooltipId}
          role="tooltip"
          aria-hidden={!tooltipVisible}
          className="absolute z-30 w-[min(320px,90vw)] rounded-2xl border border-gray-200 bg-white p-5 text-sm text-[#1a1a1a] shadow-2xl transition-all duration-200 ease-out"
          style={tooltipStyle}
        >
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#4c4c6d]">
            Detailed breakdown
          </h4>
          <dl className="max-h-64 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
            {details.map((detail) => (
              <div key={`${title}-${detail.label}`} className="flex flex-col gap-1">
                <dt className="text-xs font-medium text-[#4c4c6d]">{detail.label}</dt>
                <dd
                  className={`text-sm text-[#1a1a1a] ${detail.multiline ? "whitespace-pre-wrap break-words" : ""}`}
                >
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}

export default function AIReadinessReport({ url, analysis }: AIReadinessReportProps) {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "success">("error");
  
  const { validate, clearError, getError } = useFormValidation();

  const overallScore = clampScore(analysis.overall_score);
  const scoreStatus = getScoreStatus(overallScore);
  const scanDuration = formatDuration(analysis.scan_duration);
  const scanDate = formatDateTime(analysis.completed_at ?? analysis.scanned_at);

  const architecture = analysis.architecture ?? {};
  const security = analysis.security ?? {};
  const aiIntegration = analysis.ai_integration ?? {};
  const data = (analysis.data ?? {}) as DataSummary;
  const tech = analysis.technology_stack ?? {};

  const rawHostingProfile = architecture.hosting_profile;
  const hostingProfileData: HostingProfile | null =
    rawHostingProfile && typeof rawHostingProfile === "object" && !Array.isArray(rawHostingProfile)
      ? (rawHostingProfile as HostingProfile)
      : null;
  const hostingProviderFromProfile =
    typeof rawHostingProfile === "string" ? rawHostingProfile : hostingProfileData?.provider;

  const frontendFramework = tech.frontend_framework ?? architecture.framework;
  const hostingSummary = (() => {
    const provider = sanitizeHostingValue(hostingProviderFromProfile);
    if (provider) {
      return provider;
    }

    const hints = [
      sanitizeHostingValue(hostingProfileData?.header_hint),
      sanitizeHostingValue(hostingProfileData?.network_hint),
      sanitizeHostingValue(hostingProfileData?.ip),
    ].filter(Boolean);

    if (hints.length) {
      return hints.join(" • ");
    }

    const fallback =
      sanitizeHostingValue(architecture.hosting_provider) ||
      sanitizeHostingValue(tech.server_software) ||
      sanitizeHostingValue(architecture.cdn_provider);

    return fallback || null;
  })();

  const architectureItems = ensureItems([
    frontendFramework && `Frontend: ${frontendFramework}`,
    tech.backend_framework && `Backend: ${tech.backend_framework}`,
    hostingSummary ? `Hosting: ${hostingSummary}` : null,
    architecture.cdn_provider && `CDN: ${architecture.cdn_provider}`,
    architecture.rest_api ? "REST APIs detected" : null,
    architecture.graphql_api ? "GraphQL endpoints detected" : null,
    (architecture.cms ?? tech.cms_platform) && `CMS: ${architecture.cms ?? tech.cms_platform}`,
  ]);

  const missingHeaders =
    security.missing_headers && security.missing_headers.length > 0
      ? `Missing headers: ${security.missing_headers.slice(0, 3).join(", ")}`
      : null;

  const securityItems = ensureItems([
    security.https_enabled !== undefined
      ? security.https_enabled
        ? "HTTPS enforced"
        : "HTTPS not detected"
      : null,
    security.csp_enabled ? "Content Security Policy enabled" : null,
    security.waf_detected ? "WAF detected" : null,
    security.oauth_support ? "OAuth support available" : null,
    security.vulnerabilities?.mixed_content ? "Mixed content detected" : null,
    security.vulnerabilities?.exposed_credentials ? "Potential credentials exposed" : null,
    missingHeaders,
  ]);

  const dataExposure = data.data_exposure ?? {};
  const semanticStructure = data.semantic_structure ?? {};
  const observability = data.observability ?? {};
  const dataScores = data.scores ?? {};

  const analyticsTools =
    (observability.analytics_tools ?? data.analytics_detected ?? []).filter(
      (tool): tool is string => Boolean(tool && tool.trim())
    );

  const fallbackMonitoringTools = [
    ...(data.monitoring_tools?.apm ?? []),
    ...(data.monitoring_tools?.performance ?? []),
  ].filter((tool): tool is string => Boolean(tool && tool.trim()));

  const monitoringToolsList = Array.isArray(observability.monitoring_tools) && observability.monitoring_tools.length
    ? observability.monitoring_tools.filter((tool): tool is string => Boolean(tool && String(tool).trim()))
    : fallbackMonitoringTools;

  const publicApiCount = dataExposure.public_apis?.length ?? 0;
  const feedsCount = dataExposure.feeds?.length ?? 0;

  const analyticsSummary = summarizeList(analyticsTools, "Analytics");
  const monitoringSummary = summarizeList(monitoringToolsList, "Monitoring");

  const dataItems = ensureItems([
    dataExposure.rest ? "REST endpoints exposed" : null,
    publicApiCount ? formatCountLabel(publicApiCount, "public API") : null,
    dataExposure.graphql ? "GraphQL endpoint detected" : null,
    dataExposure.webhooks ? "Webhooks detected" : null,
    feedsCount ? formatCountLabel(feedsCount, "feed") : null,
    semanticStructure.semantic_html ? "Semantic HTML structure" : null,
    semanticStructure.open_graph ? "Open Graph metadata" : null,
    semanticStructure.twitter_cards ? "Twitter Cards configured" : null,
    semanticStructure.aria_labels ? "ARIA labels implemented" : null,
    analyticsSummary,
    monitoringSummary,
    observability.pixel_tracking ? "Pixel tracking active" : null,
    observability.telemetry ? "Telemetry enabled" : null,
    data.quality ? `Data quality: ${formatTextValue(data.quality)}` : null,
  ]);

  const aiItems = ensureItems([
    aiIntegration.ai_agent_detected ? "AI services detected" : null,
    aiIntegration.chatbot_detected
      ? `Chatbot${aiIntegration.chatbot_provider ? `: ${aiIntegration.chatbot_provider}` : " detected"}`
      : null,
    aiIntegration.crm_integration ? "CRM integration in place" : null,
    aiIntegration.recommendation_system ? "Recommendation systems active" : null,
    aiIntegration.personalization_engine ? "Personalization engine detected" : null,
  ]);

  const architectureDetails: DetailEntry[] = [
    { label: "Overall Score", value: formatScoreValue(architecture.overall_score) },
    { label: "Infrastructure Score", value: formatScoreValue(architecture.infrastructure_score) },
    { label: "Platform Score", value: formatScoreValue(architecture.platform_score) },
    { label: "API Maturity Score", value: formatScoreValue(architecture.api_maturity_score) },
    { label: "Rendering Strategy", value: formatTextValue(architecture.rendering_strategy) },
    { label: "Frontend Framework", value: formatTextValue(frontendFramework) },
    { label: "Backend Framework", value: formatTextValue(tech.backend_framework) },
    { label: "UI Framework", value: formatTextValue(tech.ui_framework) },
    { label: "CMS", value: formatTextValue(architecture.cms ?? tech.cms_platform) },
    { label: "E-commerce Platform", value: formatTextValue(tech.ecommerce_platform) },
    {
      label: "Hosting Provider",
      value: formatTextValue(
        sanitizeHostingValue(hostingProviderFromProfile) || sanitizeHostingValue(architecture.hosting_provider)
      ),
    },
    { label: "Hosting Header Hint", value: formatTextValue(sanitizeHostingValue(hostingProfileData?.header_hint)) },
    { label: "Hosting Network Hint", value: formatTextValue(sanitizeHostingValue(hostingProfileData?.network_hint)) },
    { label: "Primary IP", value: formatTextValue(sanitizeHostingValue(hostingProfileData?.ip)) },
    { label: "IP Addresses", value: formatListValue(hostingProfileData?.ip_addresses ?? null), multiline: true },
    { label: "Reverse DNS", value: formatTextValue(hostingProfileData?.reverse_dns) },
    { label: "Hosting Evidence", value: formatListValue(hostingProfileData?.evidence ?? null), multiline: true },
    { label: "SSL Issuer", value: formatKeyValueObject(hostingProfileData?.ssl?.issuer ?? null), multiline: true },
    { label: "SSL Subject", value: formatKeyValueObject(hostingProfileData?.ssl?.subject ?? null), multiline: true },
    {
      label: "SSL SANs",
      value: formatListValue(hostingProfileData?.ssl?.subject_alternative_names ?? null),
      multiline: true,
    },
    { label: "SSL Valid From", value: formatTextValue(hostingProfileData?.ssl?.not_before) },
    { label: "SSL Valid To", value: formatTextValue(hostingProfileData?.ssl?.not_after) },
    { label: "Hosting CDN", value: formatTextValue(hostingProfileData?.cdn ?? architecture.cdn_provider) },
    { label: "Server Software", value: formatTextValue(tech.server_software) },
    { label: "CDN Detected", value: formatBooleanValue(architecture.cdn_detected) },
    { label: "CDN Provider", value: formatTextValue(architecture.cdn_provider) },
    { label: "REST API Available", value: formatBooleanValue(architecture.rest_api) },
    { label: "GraphQL API Available", value: formatBooleanValue(architecture.graphql_api) },
    { label: "CORS Configured", value: formatBooleanValue(architecture.cors_configured) },
  ];

  const securityDetails: DetailEntry[] = [
    { label: "Overall Score", value: formatScoreValue(security.overall_score) },
    { label: "HTTPS Enabled", value: formatBooleanValue(security.https_enabled) },
    { label: "HSTS Enabled", value: formatBooleanValue(security.hsts_enabled) },
    { label: "Content Security Policy", value: formatBooleanValue(security.csp_enabled) },
    { label: "Web Application Firewall", value: formatBooleanValue(security.waf_detected) },
    { label: "OAuth Support", value: formatBooleanValue(security.oauth_support) },
    { label: "Mixed Content Vulnerability", value: formatBooleanValue(security.vulnerabilities?.mixed_content) },
    {
      label: "Exposed Credentials",
      value: formatBooleanValue(security.vulnerabilities?.exposed_credentials),
    },
    { label: "Insecure Forms", value: formatBooleanValue(security.vulnerabilities?.insecure_forms) },
    { label: "Missing Headers", value: formatListValue(security.missing_headers) },
  ];

  const aiIntegrationDetails: DetailEntry[] = [
    { label: "Overall Score", value: formatScoreValue(aiIntegration.overall_score) },
    { label: "Integration Score", value: formatScoreValue(aiIntegration.integration_score) },
    { label: "Personalization Score", value: formatScoreValue(aiIntegration.personalization_score) },
    { label: "AI Agent Detected", value: formatBooleanValue(aiIntegration.ai_agent_detected) },
    { label: "Chatbot Detected", value: formatBooleanValue(aiIntegration.chatbot_detected) },
    { label: "Chatbot Provider", value: formatTextValue(aiIntegration.chatbot_provider) },
    { label: "Recommendation System", value: formatBooleanValue(aiIntegration.recommendation_system) },
    { label: "CRM Integration", value: formatBooleanValue(aiIntegration.crm_integration) },
    { label: "Personalization Engine", value: formatBooleanValue(aiIntegration.personalization_engine) },
  ];

  const dataOverallScoreValue = data.data_score ?? data.overall_score;
  const dataExposureScoreValue = dataScores.data_exposure ?? data.data_exposure_score;
  const semanticScoreValue = dataScores.semantic_structure ?? data.semantic_score;
  const observabilityScoreValue = dataScores.observability ?? data.observability_score;

  const dataDetails: DetailEntry[] = [
    { label: "Overall Score", value: formatScoreValue(dataOverallScoreValue) },
    { label: "Data Score", value: formatScoreValue(data.data_score) },
    { label: "Data Quality", value: formatTextValue(data.quality) },
    { label: "Data Exposure Score", value: formatScoreValue(dataExposureScoreValue) },
    { label: "Semantic Structure Score", value: formatScoreValue(semanticScoreValue) },
    { label: "Observability Score", value: formatScoreValue(observabilityScoreValue) },
    { label: "REST Endpoints", value: formatBooleanValue(dataExposure.rest) },
    { label: "GraphQL Endpoints", value: formatBooleanValue(dataExposure.graphql) },
    { label: "Webhooks", value: formatBooleanValue(dataExposure.webhooks) },
    { label: "Metadata Schema", value: formatBooleanValue(dataExposure.metadata_schema) },
    { label: "Public APIs", value: formatListValue(dataExposure.public_apis), multiline: true },
    { label: "Feeds", value: formatListValue(dataExposure.feeds), multiline: true },
    { label: "Semantic HTML", value: formatBooleanValue(semanticStructure.semantic_html) },
    { label: "ARIA Labels", value: formatBooleanValue(semanticStructure.aria_labels) },
    { label: "JSON-LD", value: formatBooleanValue(semanticStructure.json_ld) },
    { label: "Schema.org", value: formatBooleanValue(semanticStructure.schema_org) },
    { label: "Microdata", value: formatBooleanValue(semanticStructure.microdata) },
    { label: "RDFa", value: formatBooleanValue(semanticStructure.rdfa) },
    { label: "Sitemap", value: formatBooleanValue(semanticStructure.sitemap) },
    { label: "Robots.txt", value: formatBooleanValue(semanticStructure.robots) },
    { label: "Open Graph", value: formatBooleanValue(semanticStructure.open_graph) },
    { label: "Twitter Cards", value: formatBooleanValue(semanticStructure.twitter_cards) },
    { label: "Analytics Tools", value: formatListValue(analyticsTools), multiline: true },
    { label: "Monitoring Tools", value: formatListValue(monitoringToolsList), multiline: true },
    { label: "Event Tracking", value: formatBooleanValue(observability.event_tracking) },
    { label: "Pixel Tracking", value: formatBooleanValue(observability.pixel_tracking) },
    { label: "Data Layer", value: formatBooleanValue(observability.data_layer) },
    { label: "Telemetry", value: formatBooleanValue(observability.telemetry) },
  ];

  const metrics: MetricCardProps[] = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 7L12 3L21 7M3 7L12 11M3 7V17L12 21M21 7L12 11M21 7V17L12 21M12 11V21"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Architecture",
      score: clampScore(architecture.overall_score),
      maxScore: 100,
      items: architectureItems,
      bgColor: "bg-green-100",
      delay: 0,
      details: architectureDetails,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
            stroke="#ca8a04"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Security",
      score: clampScore(security.overall_score),
      maxScore: 100,
      items: securityItems,
      bgColor: "bg-yellow-100",
      delay: 100,
      details: securityDetails,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="#9333ea" strokeWidth="2" />
          <path
            d="M12 1V4M12 20V23M23 12H20M4 12H1"
            stroke="#9333ea"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18.36 5.64L16.24 7.76M7.76 16.24L5.64 18.36M18.36 18.36L16.24 16.24M7.76 7.76L5.64 5.64"
            stroke="#9333ea"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "AI Integration",
      score: clampScore(aiIntegration.overall_score),
      maxScore: 100,
      items: aiItems,
      bgColor: "bg-purple-100",
      delay: 200,
      details: aiIntegrationDetails,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#dc2626" strokeWidth="2" />
          <path
            d="M4 6V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V6"
            stroke="#dc2626"
            strokeWidth="2"
          />
          <path
            d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12"
            stroke="#dc2626"
            strokeWidth="2"
          />
        </svg>
      ),
      title: "Data",
      score: clampScore(data.data_score ?? data.overall_score),
      maxScore: 100,
      items: dataItems,
      bgColor: "bg-red-100",
      delay: 300,
      details: dataDetails,
    },
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user starts typing
    if (getError("email")) {
      clearError("email");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const isValid = validate("email", email, {
      required: true,
      email: true,
    });

    if (!isValid) {
      setToastMessage("Please enter a valid email address");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Submit email to API
    try {
      if (!WAITLIST_ENDPOINT) {
        setToastMessage("API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL.");
        setToastType("error");
        setShowToast(true);
        return;
      }

      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let data: unknown = null;
      try {
        data = await response.json();
      } catch (parseError) {
        console.warn("Waitlist response was not JSON:", parseError);
      }

      if (!response.ok) {
        if (response.status === 409) {
          setToastMessage("This email is already on the waitlist");
        } else {
          setToastMessage(
            extractMessage(data) || "Failed to join waitlist. Please try again."
          );
        }
        setToastType("error");
        setShowToast(true);
        return;
      }
      
      // Success
      setIsSubmitted(true);
      setToastMessage(extractMessage(data) || "Successfully joined the waitlist!");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error submitting email:", error);
      setToastMessage("Failed to join waitlist. Please try again.");
      setToastType("error");
      setShowToast(true);
    }
  };

  return (
    <>
      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <main className="flex-1 bg-white px-6 py-12">
        <div className="w-full max-w-[1200px] mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-6">AI Readiness report</h1>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#4c4c6d] mb-12 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span>Scanned URL:</span>
            <a href={url} className="text-[#00a7e6] hover:underline font-medium">
              {url || "example.com"}
            </a>
          </div>
          <span className="text-gray-300">|</span>
          <div>
            <span>Scanned Duration: </span>
            <span className="font-medium text-[#1a1a1a]">{scanDuration}</span>
          </div>
          <span className="text-gray-300">|</span>
          <div>
            <span>Date: </span>
            <span className="font-medium text-[#1a1a1a]">{scanDate}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Score Circle */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              {/* Circular Chart */}
              <div className="flex justify-center mb-6">
                <div className="relative w-52 h-52">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="18"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke={scoreStatus.meterColor ?? "#00a7e6"}
                      strokeWidth="18"
                      strokeDasharray={SCORE_RING_CIRCUMFERENCE}
                      strokeDashoffset={SCORE_RING_CIRCUMFERENCE - (overallScore / 100) * SCORE_RING_CIRCUMFERENCE}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-[#1a1a1a]">{overallScore}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
                  Status: <span className={scoreStatus.color}>{scoreStatus.label}</span>
                </h3>
                <p className="text-sm text-[#4c4c6d]">{scoreStatus.description}</p>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                <div className="flex flex-col items-center gap-1 text-sm text-[#4c4c6d]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
                    <span>0 - 30</span>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-[#ef4444] font-semibold">
                    High Risk
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-sm text-[#4c4c6d]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#facc15" }}></div>
                    <span>31 - 70</span>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-[#facc15] font-semibold">
                    Moderate
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-sm text-[#4c4c6d]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#22c55e" }}></div>
                    <span>71 - 100</span>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-[#22c55e] font-semibold">
                    Success
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile CTA Button - Right below Status Score */}
            <div className="mt-6 lg:hidden">
              {isSubmitted ? (
                <div className="flex flex-col gap-3 bg-green-50 border-2 border-green-500 rounded-lg px-6 py-4 animate-fade-in">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-semibold text-[#1a1a1a]">WAITLIST JOINED</span>
                  </div>
                  <div className="text-center text-sm text-[#4c4c6d]">{email}</div>
                </div>
              ) : !showEmailInput ? (
                <button
                  onClick={() => setShowEmailInput(true)}
                  className="w-full bg-[#00a7e6] hover:bg-[#0096d1] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  See Full Insights
                </button>
              ) : (
                <div className="w-full animate-fade-in">
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        autoFocus
                        className={`w-full px-6 py-4 pr-16 border-2 rounded-lg focus:outline-none focus:ring-2 text-[#1a1a1a] placeholder-gray-400 transition-all duration-300 ${
                          getError("email")
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-[#00a7e6] focus:ring-[#00a7e6] focus:border-transparent"
                        }`}
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-gray-600 transition-all hover:bg-gray-300"
                        aria-label="Submit"
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <InputError message={getError("email")} />
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Metric Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>
        </div>

        {/* Desktop CTA Button / Email Input / Success Message - Hidden on mobile */}
        <div className="hidden sm:flex justify-center lg:justify-end">
          {isSubmitted ? (
            <div className="flex items-center gap-3 bg-green-50 border-2 border-green-500 rounded-lg px-6 py-4 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-[#1a1a1a]">{email}</span>
                <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold whitespace-nowrap">WAITLIST JOINED</span>
                </div>
              </div>
            </div>
          ) : !showEmailInput ? (
            <button
              onClick={() => setShowEmailInput(true)}
              className="w-full sm:w-auto bg-[#00a7e6] hover:bg-[#0096d1] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              JOIN THE WAITLIST FOR FULL INSIGHTS
            </button>
          ) : (
            <div className="w-full sm:w-auto animate-fade-in">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    autoFocus
                    className={`w-full sm:min-w-[320px] px-6 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 text-[#1a1a1a] placeholder-gray-400 transition-all duration-300 ${
                      getError("email")
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-[#00a7e6] focus:ring-[#00a7e6] focus:border-transparent"
                    }`}
                  />
                  <InputError message={getError("email")} />
                </div>
                <button
                  type="submit"
                  className="bg-[#00a7e6] hover:bg-[#0096d1] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
        </div>
      </main>
    </>
  );
}

