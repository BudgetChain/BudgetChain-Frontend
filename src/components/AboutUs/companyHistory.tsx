
const timelineData = [
    {
        year: "2019",
        title: "Founded",
        description: "BudgetChain was founded with a vision to simplify financial transparency for organizations and governments.",
        impact: "+10 NGOs onboarded",
    },
    {
        year: "2020",
        title: "MVP Launched",
        description: "Launched our first version helping small organizations track and manage budget allocations in real time.",
        impact: "₦25M in tracked spending",
    },
    {
        year: "2021",
        title: "Scale-Up Phase",
        description: "Expanded operations across 3 West African countries with government pilot projects.",
        impact: "Government partnerships in 3 countries",
    },
    {
        year: "2023",
        title: "Blockchain Integration",
        description: "Integrated smart contracts to ensure immutable financial reporting and disbursement transparency.",
        impact: "150+ smart contracts deployed",
    },
];


const CompanyHistory = () => {
    return (
        <section className="text-white flex flex-col items-center justify-center py-16 px-8 md:px-16 ">
            <h3 className="text-3xl font-bold mb-6 text-center">
                Company History & Impact Timeline
            </h3>

            <p className="text-gray-400 max-w-3xl text-center mb-12">
                From humble beginnings to continent-wide impact, BudgetChain's journey is marked by innovation, transparency, and social good. Here's a look at our evolution and the lives we've touched along the way.
            </p>

            <div className="relative border-l-2 border-gray-700 pl-6 max-w-4xl w-full">
                {timelineData.map((item, index) => (
                    <div key={index} className="mb-10 relative">
                        <div className="absolute -left-4 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="bg-[#131322]  p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
                            <h4 className="text-xl font-semibold mb-1">{item.year} – {item.title}</h4>
                            <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                            <span className="text-xs text-blue-400 font-medium uppercase tracking-wide">
                                {item.impact}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CompanyHistory;