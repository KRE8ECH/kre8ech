import { initialHackathons } from "@/data/mockData";
import HackathonDetailClient from "./HackathonDetailClient";

export async function generateStaticParams() {
  const params: { id: string }[] = [];
  initialHackathons.forEach((h) => {
    params.push({ id: h.id });
    if (h.slug && h.slug !== h.id) {
      params.push({ id: h.slug });
    }
  });
  return params;
}

export default function HackathonDetailPage({ params }: { params: { id: string } }) {
  return <HackathonDetailClient id={params.id} />;
}
