const whitepaperSections = [
    {
        title: "Abstract / Executive Summary",
        content:
            "BudgetChain introduces a decentralized platform that ensures transparent and accountable budget management for public and private organizations using blockchain and smart contracts.",
    },
    {
        title: "Problem Statement",
        content:
            "Traditional budget systems are plagued by opacity, manual processes, and fund mismanagement. BudgetChain addresses these issues with programmable transparency.",
    },
    {
        title: "Technical Architecture",
        content:
            "Our system leverages smart contracts on the Polygon blockchain, with a React + Node.js frontend/backend stack. IPFS is used for document verification, while a PostgreSQL database stores off-chain metadata.",
    },
    {
        title: "Token Economics",
        content:
            "BGC Token powers governance and fee transactions. Token holders can propose and vote on budgets, with 2% of fees redistributed to staking pools.",
    },
    {
        title: "Governance Model",
        content:
            "Decentralized governance through a DAO. Token-weighted voting ensures that stakeholders influence protocol updates, disbursements, and roadmap shifts.",
    },
    {
        title: "Roadmap",
        content:
            "Q2 2024: Beta Launch. Q3 2024: DAO Formation. Q1 2025: Government Integration Pilot. Q4 2025: Full Open Protocol Governance.",
    },
    {
        title: "References / Citations",
        content:
            "[1] Ethereum Whitepaper • [2] Polygon Docs • [3] Vitalik’s Governance Thesis • [4] IMF Report on Fiscal Transparency (2022)",
    },
];

const Others = () => {
    return (
        <section className="text-white py-20 px-6 md:px-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Whitepaper Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                {whitepaperSections.map((section, idx) => (
                    <div
                        key={idx}
                        className="hover:bg-white/20 transition-all rounded-lg shadow-xl p-6 border border-blue-400/30 group backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm text-blue-300 font-semibold">
                                {String(idx + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-xl font-semibold text-blue-100 group-hover:text-blue-200">
                                {section.title}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-100 leading-relaxed">
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Others;