const TechnicalDocumentation = () => {
  return (
    <section className="text-white py-20 px-6 md:px-16 mt-32 ">
      <div className="flex flex-col gap-5">
        <h1 className="md:text-[64px] text-[30px] font-bold mb-4 bg-gradient-to-r from-[#c4c4cf] via-[#9493cf] to-[#5B54FF] bg-clip-text text-transparent text-center">
          Technical Documentation
        </h1>
        <div className="text-center ">
          <a
            href="/BudgetChain_Whitepaper.pdf"
            download
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
          >
            📥 Download Whitepaper (PDF)
          </a>
        </div>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Here is a breakdown of the core components powering
          <strong>BudgetChain</strong> — from decentralized methodologies to
          transparent finance tracking built on blockchain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="border rounded-xl p-6 shadow-lg hover:shadow-blue-500/30 transition-all">
          <h3 className="text-xl font-semibold mb-3 text-blue-400">
            Blockchain-Based Budget Management
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            BudgetChain leverages smart contracts deployed on the Polygon
            blockchain to automate fund allocation, spending tracking, and
            real-time auditing.
          </p>
          <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-md overflow-auto">
            {
              '// Example Smart Contract Snippet\nfunction allocateFunds(address recipient, uint256 amount) public onlyOwner {\n  balances[recipient] += amount;\n  emit FundAllocated(recipient, amount);\n}'
            }
          </pre>
        </div>

        {/* Card 2 */}
        <div className="border rounded-xl p-6 shadow-lg hover:shadow-blue-500/30 transition-all">
          <h3 className="text-xl font-semibold mb-3 text-blue-400">
            Technology Stack Overview
          </h3>
          <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
            <li>
              <strong>Frontend:</strong> React, Next.js, Tailwind CSS
            </li>
            <li>
              <strong>Backend:</strong> Node.js, Express, PostgreSQL
            </li>
            <li>
              <strong>Blockchain:</strong> Solidity, Polygon, Web3.js
            </li>
            <li>
              <strong>CI/CD:</strong> Docker, GitHub Actions
            </li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="border rounded-xl p-6 shadow-lg hover:shadow-blue-500/30 transition-all">
          <h3 className="text-xl font-semibold mb-3 text-blue-400">
            Decentralized Finance Methodology
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            Every transaction and budget decision is governed by transparent
            smart contracts. No central authority can manipulate the process —
            ensuring fairness and community-driven governance.
          </p>
          <pre className="bg-gray-900 text-purple-300 text-xs p-4 rounded-md overflow-auto">
            {
              '// Treasury Voting Sample\nstruct Proposal {\n  uint id;\n  string description;\n  uint voteCount;\n}'
            }
          </pre>
        </div>

        {/* Card 4 */}
        <div className="border rounded-xl p-6 shadow-lg hover:shadow-blue-500/30 transition-all">
          <h3 className="text-xl font-semibold mb-3 text-blue-400">
            Security & Transparency
          </h3>
          <ul className="text-sm text-gray-300 list-disc pl-5 space-y-2">
            <li>End-to-end transaction logging on-chain</li>
            <li>Immutable smart contracts audited before deployment</li>
            <li>Role-based access controls with wallet verification</li>
            <li>Real-time analytics for all public disbursements</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TechnicalDocumentation;
