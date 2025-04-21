import ProjectDashboard from '../components/appealsDocument'

interface SetActiveTabProps {
    setActiveTabOne: (tab: string) => void;
}

const PendingDocument: React.FC<SetActiveTabProps> = ({ setActiveTabOne }) => {
  const projectData = {
    projectName: 'Ndida',
    teamHead: 'Joe Dale',
    teamSize: 4,
    projectPurpose: 'To help in Medical Growth in Tumas community',
    fundsRequested: 20000,
    timelineMonths: 2,
    startDate: '12/12/2026',
    endDate: '12/05/2027',
    location: 'Nigeria',
    completionPercentage: 80,
    documents: [
      {
        id: '1',
        title: 'NDA Agreement 1',
        imageUrl: '/doc.png',
      },
      {
        id: '2',
        title: 'NDA Agreement 2',
        imageUrl: '/doc.png',
      },
    ],
  };

  return <ProjectDashboard {...projectData} setActiveTabOne={setActiveTabOne} />;
}

export default PendingDocument;