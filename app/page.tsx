import { EventDashboard } from '@/widgets/EventDashboard';
import { fetchProjects } from '@/shared/api';

export default async function Home() {
  const projects = await fetchProjects();

  return <EventDashboard initialProjects={projects} />;
}
