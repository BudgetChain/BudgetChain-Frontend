import WalletConnectButton from '@/components/wallet/wallet-connect-button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">BudgetChain</h1>
      <WalletConnectButton />
    </main>
  );
}
