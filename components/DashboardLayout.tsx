import { Sidebar } from "./Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-neutral-50">
        <div className="mx-auto max-w-7xl p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

