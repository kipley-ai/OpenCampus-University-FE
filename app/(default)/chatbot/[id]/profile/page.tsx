"use client";

import { useParams } from "next/navigation";
import ProfilePageV2 from "./page-v2";
import ProfessorProfilePage from "./professor-page";

export default function Page() {
  const { id: slug }: { id: string } = useParams();

  if (slug.startsWith("oc-prof-")) return <ProfessorProfilePage />;

  return <ProfilePageV2 />;
}
