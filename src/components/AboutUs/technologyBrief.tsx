const techBriefDescription =
  'At BudgetChain, we use an interconnected stack of powerful technologies that ensure transparency, security, and performance across every transaction and user interaction.';

const technologyGroups = [
  {
    category: 'Frontend',
    items: [
      {
        name: 'React',
        description:
          'Builds seamless user interfaces for a responsive and intuitive experience.',
        icon: 'svg/React-icon.svg',
      },
      {
        name: 'Tailwind CSS',
        description:
          'Delivers fast and consistent UI styling across all pages.',
        icon: 'svg/tailwind.svg',
      },
    ],
  },
  {
    category: 'Backend',
    items: [
      {
        name: 'Node.js',
        description:
          'Drives our API logic and business rules with event-driven architecture.',
        icon: 'svg/nodejs.svg',
      },
      {
        name: 'Express',
        description: 'Handles our routing and middleware stack efficiently.',
        icon: 'svg/express.svg',
      },
    ],
  },
  {
    category: 'DevOps & Infra',
    items: [
      {
        name: 'Docker',
        description:
          'Isolates services for seamless CI/CD and scalable deployment.',
        icon: 'svg/docker.svg',
      },
      {
        name: 'GitHub Actions',
        description: 'Automates builds, tests, and deployment pipelines.',
        icon: 'svg/github-2.svg',
      },
    ],
  },
  {
    category: 'Blockchain',
    items: [
      {
        name: 'Solidity',
        description:
          'Powers our smart contracts for transparent financial flows.',
        icon: 'svg/solidity.svg',
      },
      {
        name: 'Starknet',
        description: 'Provides low-cost, scalable blockchain infrastructure.',
        icon: 'svg/sta-1.svg',
      },
    ],
  },
];
const TechnologyBrief = () => {
  return (
    <section className="text-white flex flex-col items-center justify-center py-16 px-8 md:px-16 bg-gradient-to-b ">
      <h3 className="text-3xl font-bold mb-6 text-center">Technology Brief</h3>
      <p className="text-gray-400 max-w-3xl text-center mb-16">
        {techBriefDescription}
      </p>
      <div className="space-y-12 w-full">
        {technologyGroups.map((group, idx) => (
          <div key={idx}>
            <h4 className="text-2xl font-semibold text-blue-400 mb-4 border-b border-gray-700 pb-1">
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-8 justify-center">
              {group.items.map((tech, index) => (
                <div
                  key={index}
                  className="h-[300px] w-[300px] flex flex-col items-center justify-center bg-[#131322] p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 hover:scale-105 transform transition-all text-center"
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-12 h-12 mb-3"
                  />
                  <h5 className="text-lg font-semibold text-white mb-1">
                    {tech.name}
                  </h5>
                  <p className="text-sm text-gray-400">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologyBrief;
