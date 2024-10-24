import { AcademicGrantsFundPage } from "@/app/(articles)/articles/academic-grants-fund/academic-grants-fund";
import GrantsHeader from "@/components/ui/grants-headers";

export default function Page() {
  return (
    <div className="h-[max(100vh, fit-content)] relative flex flex-1 grow flex-col overflow-y-auto bg-container text-heading">
      <GrantsHeader />
      <main className="mx-3 md:mx-6 xl:mx-16 my-12 max-w-[1500px] grow self-center">
        <AcademicGrantsFundPage />
      </main>
    </div>
  );
}
