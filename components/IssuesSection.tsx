"use client";

type Issue = {
  text: string;
  highlight?: string;
};

type IssuesSectionProps = {
  title: string;
  description: string;
  issues: Issue[];
};

export function IssuesSection({ title, description, issues }: IssuesSectionProps) {
  return (
    <div className="rounded-xl bg-white p-6">
      <h3 className="mb-2 text-base font-semibold text-neutral-900">{title}</h3>
      <p className="mb-6 text-sm text-neutral-600">{description}</p>

      <div className="rounded-lg bg-neutral-50 p-4">
        <h4 className="mb-3 text-sm font-semibold text-neutral-900">Issues:</h4>
        <ul className="space-y-2">
          {issues.map((issue, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-neutral-700">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
              <span>
                {issue.text}
                {issue.highlight && (
                  <span className="font-medium text-purple-600"> {issue.highlight}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

