export interface WalletOption {
  id: string;
  name: string;
  icon: string;
  network: 'ethereum' | 'starknet';
  connectorId: string;
}
