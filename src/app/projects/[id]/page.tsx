import { initialProjects } from "@/data/mockData";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  const params: { id: string }[] = [];
  initialProjects.forEach((p) => {
    params.push({ id: p.id });
    if (p.slug && p.slug !== p.id) {
      params.push({ id: p.slug });
    }
  });
  return params;
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient id={params.id} />;
}
