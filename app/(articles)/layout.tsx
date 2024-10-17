import HeaderV2 from "@/components/ui/header-2";

interface ArticlesLayoutProps {
  children: React.ReactNode;
}

export default function ArticlesLayout({ children }: ArticlesLayoutProps) {
  return (
    <div className="h-[max(100vh, fit-content)] relative flex flex-1 grow flex-col overflow-y-auto bg-container text-heading">
      <HeaderV2 />
      <main className="mx-16 my-12 max-w-[1500px] grow self-center">
        {children}
      </main>
    </div>
  );
}
