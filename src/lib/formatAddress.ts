export function formatAddress(address: string | undefined): string {
  if (!address) return '';

  // Handle Starknet addresses which might be in a different format
  if (address.startsWith('0x')) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  // For other address formats, ensure we have enough characters
  if (address.length < 10) return address;

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
