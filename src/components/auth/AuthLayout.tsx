import React, { useState } from 'react';
import RoleSelection from '../auth/RoleSelection';
import Login from '../auth/Login';
import AccountCreation from './Upload';

type RoleType = 'Investor' | 'Admin' | 'DAO Member' | '';
type AuthStep = 'role-selection' | 'login' | 'account-creation';

interface LoginCredentials {
  walletAddress: string;
  password: string;
}

interface AccountData {
  document: File | null;
  password: string;
}

const AuthPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('role-selection');
  const [selectedRole, setSelectedRole] = useState<RoleType>('');
  const [userCredentials, setUserCredentials] =
    useState<LoginCredentials | null>(null);

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleLogin = (credentials: LoginCredentials) => {
    console.log('Logging in with credentials:', credentials);
    setUserCredentials(credentials);
  };

  const handleAccountCreation = (accountData: AccountData) => {
    console.log('Creating account with data:', {
      role: selectedRole,
      ...accountData,
    });
  };

  const goToLogin = () => {
    setCurrentStep('login');
  };

  const goToAccountCreation = () => {
    setCurrentStep('account-creation');
  };

  const goToRoleSelection = () => {
    setCurrentStep('role-selection');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#121225] text-white">
      {currentStep === 'role-selection' && (
        <RoleSelection onRoleSelect={handleRoleSelect} onNext={goToLogin} />
      )}

      {currentStep === 'login' && (
        <Login onLogin={handleLogin} onBack={goToRoleSelection} />
      )}

      {currentStep === 'account-creation' && (
        <AccountCreation
          onBack={goToRoleSelection}
          onSubmit={handleAccountCreation}
        />
      )}

      {currentStep !== 'account-creation' && (
        <div className="mt-8 text-center">
          <button
            onClick={goToAccountCreation}
            className="text-sm text-[#6366F1] hover:underline"
            type="button"
          >
            Need to create an account instead?
          </button>
        </div>
      )}

      {currentStep === 'account-creation' && (
        <div className="mt-8 text-center">
          <button
            onClick={goToLogin}
            className="text-sm text-[#6366F1] hover:underline"
            type="button"
          >
            Already have an account? Login instead
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
