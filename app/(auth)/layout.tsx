import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh divide-x-2 divide-border text-heading">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto">
        <div className="h-[max(100vh, fit-content)] grow bg-sidebar">
          <Header />
          <main className="h-[calc(100%-5rem)] p-3 md:p-6 xl:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
