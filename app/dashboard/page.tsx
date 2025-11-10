"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusScore } from "@/components/StatusScore";
import { InterestChart } from "@/components/InterestChart";
import { YourScore } from "@/components/YourScore";
import { ScoreHistory } from "@/components/ScoreHistory";
import { MetricsCharts } from "@/components/MetricsCharts";
import { FindingsInsights } from "@/components/FindingsInsights";
import { IssuesSection } from "@/components/IssuesSection";
import { ActionButtons } from "@/components/ActionButtons";
import { OptimizationModal } from "@/components/OptimizationModal";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data
  const interestData = [
    { x: 0, y: 10 },
    { x: 1, y: 15 },
    { x: 2, y: 13 },
    { x: 3, y: 12 },
    { x: 4, y: 10 },
    { x: 5, y: 18 },
    { x: 6, y: 20 },
    { x: 7, y: 25 },
    { x: 8, y: 30 },
    { x: 9, y: 25 },
    { x: 10, y: 35 },
    { x: 11, y: 25 },
    { x: 12, y: 30 },
    { x: 13, y: 40 },
    { x: 14, y: 35 },
    { x: 15, y: 45 },
    { x: 16, y: 43 },
    { x: 17, y: 40 },
    { x: 18, y: 68 },
  ];

  const barData = [
    { label: "APIs Present", observed: 81, given: 65, combined: 41 },
    { label: "Auth Maturity", observed: 55, given: 65, combined: 74 },
    { label: "Security", observed: 74, given: 65, combined: 41 },
    { label: "Integrations", observed: 55, given: 65, combined: 74 },
  ];

  const radarData = [
    { label: "Auth Maturity", value: 75 },
    { label: "Present", value: 85 },
    { label: "Security Posture", value: 40 },
    { label: "Integrations", value: 45 },
    { label: "Infra Hints", value: 60 },
  ];

  const insights = [
    {
      title: "Intent Analysis - 56%",
      percentage: 56,
      change: 24,
      details: ["Score underperforming", "Priority: High"],
    },
    {
      title: "Intent Analysis - 64%",
      percentage: 64,
      change: -12,
      details: ["Score underperforming", "Priority: High"],
    },
    {
      title: "Intent Analysis - 23%",
      percentage: 23,
      change: -12,
      details: ["Score underperforming", "Priority: High"],
    },
    {
      title: "Intent Analysis - 34%",
      percentage: 34,
      change: 78,
      details: ["Score underperforming", "Priority: High"],
    },
  ];

  const privateAppsIssues = [
    { text: "/user/login received 15,200 requests in the last 24 hours," },
    { text: "The overall average response time is 1.24 seconds," },
    { text: "Peak times reaching up to 2.1 seconds." },
  ];

  const customEndpointsIssues = [
    { text: "/order/create experienced the highest error rate at", highlight: "2.8%" },
    { text: "Mostly due to validation failures," },
    {
      text: "/payment/checkout recorded the slowest performance with an average latency of",
      highlight: "1.87 seconds.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Status Score */}
        <StatusScore
          score={67}
          status="High Risk"
          description="Values are estimated and may vary. Scores is calculated directly from these metrics."
        />

        {/* Interest over time chart */}
        <InterestChart
          title="Interest over time:"
          data={interestData}
          xLabels={["APIs Present", "Auth Maturity", "Security", "Integrations"]}
        />

        {/* Your Score */}
        <YourScore
          score={90.87}
          description="Values are estimated and may vary. Scores is calculated directly from these metrics."
        />

        {/* Score History */}
        <ScoreHistory
          title="90 day score history:"
          metrics={[
            { value: "50.84", change: 24, period: "7 - day change" },
            { value: "50.84", change: -12, period: "30 - day change" },
            { value: "50.84", change: 24, period: "90 - day change" },
          ]}
        />

        {/* Bar and Radar Charts */}
        <MetricsCharts barData={barData} radarData={radarData} />

        {/* Findings & Insights */}
        <FindingsInsights title="Finding & Insights:" insights={insights} />

        {/* Private Apps */}
        <IssuesSection
          title="Private Apps:"
          description="This indicates that login activity is the primary driver of API usage and may require scaling for peak times."
          issues={privateAppsIssues}
        />

        {/* Expose Custom Endpoints */}
        <IssuesSection
          title="Expose Custom Endpoints:"
          description="Identifying error-prone endpoints helps prioritize bug fixes and improve system reliability."
          issues={customEndpointsIssues}
        />

        {/* Action Buttons */}
        <ActionButtons
          onDownload={() => console.log("Download report")}
          onEmail={() => setIsModalOpen(true)}
        />
      </div>

      {/* Modal */}
      <OptimizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </DashboardLayout>
  );
}

