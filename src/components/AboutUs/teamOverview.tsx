import Image from "next/image";

const teamMembers = [
    {
        name: "John Doe",
        role: "CEO",
        image: "/svg/TestImage.svg",
        bio: "John is the visionary behind our company, leading strategy and growth with over 15 years of experience in tech and business.",
    },
    {
        name: "Jane Smith",
        role: "CTO",
        image: "/svg/TestImage.svg",
        bio: "Jane drives our tech innovations, overseeing product development, system architecture, and engineering operations.",
    },
    {
        name: "Mike Johnson",
        role: "Head of Marketing",
        image: "/svg/TestImage.svg",
        bio: "Mike leads our marketing team, crafting campaigns that connect with our users and expand our brand reach globally.",
    },
    {
        name: "Linda Brown",
        role: "Product Manager",
        image: "/svg/TestImage.svg",
        bio: "Linda coordinates cross-functional teams to deliver exceptional products that meet user needs and market trends.",
    },
    {
        name: "Chris Evans",
        role: "Lead Designer",
        image: "/svg/TestImage.svg",
        bio: "Chris brings designs to life with a focus on user-centered experiences, UI consistency, and visual storytelling.",
    },
    {
        name: "Sara Lee",
        role: "Operations Manager",
        image: "/svg/TestImage.svg",
        bio: "Sara ensures smooth daily operations and team efficiency, supporting growth with systems and processes that scale.",
    },
];


const TeamOverview = () => {
    return (<section className="text-white flex flex-col items-start gap-10 justify-center py-16 px-8 md:px-16 ">
        <h3 className="text-3xl font-bold text-white">Team Overview</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {teamMembers.map((member, index) => (
                <div
                    key={index}
                    className="bg-[#050512] hover:bg-gray-700 transition-colors p-6 rounded-2xl shadow-xl border border-gray-700"
                >
                    <div className="flex items-center space-x-4 mb-4">
                        <Image
                            src={member.image}
                            alt={member.name}
                            width={48}
                            height={48}
                            className="rounded-full border border-gray-600"
                        />
                        <div>
                            <h4 className="text-lg font-semibold">{member.name}</h4>
                            <p className="text-sm text-gray-300 italic">{member.role}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400">{member.bio}</p>
                </div>
            ))}
        </div>

        <p className="text-sm text-gray-400 max-w-3xl">
            Our team is made up of passionate individuals committed to delivering excellence across every department. From engineering to design, strategy to operations — we work together to bring the vision to life.
        </p>
    </section>);
}

export default TeamOverview;