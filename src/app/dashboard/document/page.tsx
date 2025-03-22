import ProjectDashboard from '../components/document';

export default function ProjectPage() {
  const projectData = {
    projectName: 'Kadex',
    teamHead: 'Joe Dale',
    teamSize: 4,
    projectPurpose: 'To help in Medical Growth in Tumas community',
    fundsRequested: 320000,
    timelineMonths: 7,
    startDate: '12/12/2026',
    endDate: '19/05/2027',
    location: 'Nigeria',
    completionPercentage: 80,
    documents: [
      {
        id: '1',
        title: 'NDA Agreement 1',
        imageUrl: '/document1.jpg',
      },
      {
        id: '2',
        title: 'NDA Agreement 2',
        imageUrl: '/document2.jpg',
      },
    ],
  };

  return <ProjectDashboard {...projectData} />;
}
