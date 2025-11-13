export interface AnalysisStatusResponse {
  scan_id: number;
  status: string;
  message?: string;
  url: string;
}

export interface HostingCertificateParty {
  countryName?: string | null;
  stateOrProvinceName?: string | null;
  localityName?: string | null;
  organizationName?: string | null;
  organizationalUnitName?: string | null;
  commonName?: string | null;
}

export interface HostingCertificate {
  issuer?: HostingCertificateParty | null;
  subject?: HostingCertificateParty | null;
  subject_alternative_names?: string[] | null;
  not_before?: string | null;
  not_after?: string | null;
}

export interface HostingProfile {
  provider?: string | null;
  header_hint?: string | null;
  network_hint?: string | null;
  ip?: string | null;
  ip_addresses?: string[] | null;
  reverse_dns?: string | null;
  ssl?: HostingCertificate | null;
  cdn?: string | null;
  evidence?: string[] | null;
}

export interface ArchitectureSummary {
  overall_score?: number | null;
  infrastructure_score?: number | null;
  platform_score?: number | null;
  api_maturity_score?: number | null;
  cdn_detected?: boolean | null;
  cdn_provider?: string | null;
  hosting_provider?: string | null;
  hosting_profile?: HostingProfile | string | null;
  framework?: string | null;
  cms?: string | null;
  rendering_strategy?: string | null;
  rest_api?: boolean | null;
  graphql_api?: boolean | null;
  cors_configured?: boolean | null;
}

export interface SecuritySummary {
  overall_score?: number | null;
  https_enabled?: boolean | null;
  hsts_enabled?: boolean | null;
  csp_enabled?: boolean | null;
  vulnerabilities?: {
    mixed_content?: boolean | null;
    exposed_credentials?: boolean | null;
    insecure_forms?: boolean | null;
  } | null;
  waf_detected?: boolean | null;
  oauth_support?: boolean | null;
  missing_headers?: string[] | null;
}

export interface AIIntegrationSummary {
  overall_score?: number | null;
  integration_score?: number | null;
  personalization_score?: number | null;
  ai_agent_detected?: boolean | null;
  chatbot_detected?: boolean | null;
  chatbot_provider?: string | null;
  recommendation_system?: boolean | null;
  crm_integration?: boolean | null;
  personalization_engine?: boolean | null;
}

export interface DataExposureDetail {
  rest?: boolean | null;
  public_apis?: string[] | null;
  graphql?: boolean | null;
  webhooks?: boolean | null;
  metadata_schema?: boolean | null;
  feeds?: string[] | null;
}

export interface SemanticStructureDetail {
  json_ld?: boolean | null;
  schema_org?: boolean | null;
  microdata?: boolean | null;
  rdfa?: boolean | null;
  semantic_html?: boolean | null;
  aria_labels?: boolean | null;
  sitemap?: boolean | null;
  robots?: boolean | null;
  open_graph?: boolean | null;
  twitter_cards?: boolean | null;
}

export interface ObservabilityDetail {
  analytics_tools?: string[] | null;
  monitoring_tools?: string[] | null;
  event_tracking?: boolean | null;
  pixel_tracking?: boolean | null;
  data_layer?: boolean | null;
  telemetry?: boolean | null;
}

export interface DataScoresDetail {
  data_exposure?: number | null;
  semantic_structure?: number | null;
  observability?: number | null;
}

export interface DataSummary {
  overall_score?: number | null;
  data_exposure_score?: number | null;
  semantic_score?: number | null;
  observability_score?: number | null;
  public_api?: boolean | null;
  graphql?: boolean | null;
  schema_org?: boolean | null;
  analytics_detected?: string[] | null;
  monitoring_tools?: {
    apm?: string[] | null;
    performance?: string[] | null;
  } | null;
  data_score?: number | null;
  quality?: string | null;
  data_exposure?: DataExposureDetail | null;
  semantic_structure?: SemanticStructureDetail | null;
  observability?: ObservabilityDetail | null;
  scores?: DataScoresDetail | null;
}

export interface TechnologyStackSummary {
  frontend_framework?: string | null;
  backend_framework?: string | null;
  ui_framework?: string | null;
  cms_platform?: string | null;
  ecommerce_platform?: string | null;
  server_software?: string | null;
}

export interface ComprehensiveAnalysisResponse extends AnalysisStatusResponse {
  overall_score?: number | null;
  scan_duration?: number | null;
  error_message?: string | null;
  scanned_at?: string | null;
  completed_at?: string | null;
  architecture?: ArchitectureSummary | null;
  security?: SecuritySummary | null;
  ai_integration?: AIIntegrationSummary | null;
  data?: DataSummary | null;
  technology_stack?: TechnologyStackSummary | null;
  frontend?: Record<string, unknown> | null;
  backend?: Record<string, unknown> | null;
  authentication?: Record<string, unknown> | null;
  headless?: Record<string, unknown> | null;
}

export type StoredAnalysisData = Partial<ComprehensiveAnalysisResponse> &
  Pick<AnalysisStatusResponse, "scan_id" | "status" | "url"> & {
    message?: string;
    saved_at?: string;
  };

