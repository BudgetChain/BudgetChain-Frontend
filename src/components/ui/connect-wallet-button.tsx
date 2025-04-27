import React from 'react';

interface ConnectWalletButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`block mx-auto w-full sm:w-[45%] py-3 rounded-xl text-[12px] text-white font-extralight ${
        disabled
          ? 'bg-[#4F4AE6] opacity-50 cursor-not-allowed'
          : 'bg-[#4F4AE6] hover:bg-[rgb(54,50,156)]'
      } transition-colors`}
      type="button"
      disabled={disabled}
    >
      CONNECT WALLET
    </button>
  );
};

export default ConnectWalletButton;
