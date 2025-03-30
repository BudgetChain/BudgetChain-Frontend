import { FinancialSummary } from '@/components/LandingFeature/financial-summary';
import { AIAnalysis } from '@/components/LandingFeature/ai-analysis';
import { FundsAllocation } from '@/components/LandingFeature/projectsFundsAllocation';
import { PendingAppeals } from '@/components/LandingFeature/pending-appeals';
import { TransactionsTable } from '@/components/LandingFeature/transaction-table';
import Navbar from '@/components/navbar';

function OrganizationDashboard() {
  return (
    <div className="bg-[#171720]">
      <main className="overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FinancialSummary
            title="Total Money Available"
            amount="$203,500.568"
            subtitle="NATIVE MINTED USUK"
            type="total"
          />
          <FinancialSummary
            title="Total Money Received"
            amount="$117,000.00"
            type="received"
          />
          <FinancialSummary
            title="Total Money Withdrawn"
            amount="$20,500.017"
            type="withdrawn"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-6 w-full">
          <AIAnalysis />
          <div className="grid grid-cols-1 gap-4 w-full">
            <PendingAppeals />
            <FundsAllocation />
          </div>
        </div>

        <TransactionsTable />
      </main>
      <div className="hidden fixed top-4 left-4 z-50">
        <Navbar />
      </div>
    </div>
  );
}

export default OrganizationDashboard;
