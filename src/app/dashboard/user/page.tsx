import { Sidebar } from '@/components/LandingFeature/sidebar';
import { Header } from '@/components/LandingFeature/header';
import { FinancialSummary } from '@/components/LandingFeature/financial-summary';
import { AIAnalysis } from '@/components/LandingFeature/ai-analysis';
import { FundsAllocation } from '@/components/LandingFeature/projectsFundsAllocation';
import { PendingAppeals } from '@/components/LandingFeature/pending-appeals';
import { TransactionsTable } from '@/components/LandingFeature/transaction-table';
import { MobileNav } from '@/components/LandingFeature/mobileNav';

function UserDashboard() {
  return (
    <div className="bg-[#171720]">
      <div className="flex h-screen ">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <AIAnalysis />
              <div className="grid grid-cols-1 gap-4 ml-36">
                <PendingAppeals />
                <FundsAllocation />
              </div>
            </div>

            <TransactionsTable />
          </main>
        </div>
      </div>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <MobileNav />
      </div>
    </div>
  );
}

export default UserDashboard;
