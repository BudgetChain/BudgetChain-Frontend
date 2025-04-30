'use client';

import React from 'react';
import { SettingsForm } from '@/components/settings/SettingsForm';

const SettingsPage = () => {
  return (
    <div>
      <div className="p-4 w-full">
        <div className="mx-auto">
          <h1 className="text-2xl font-semibold text-white mb-4">Settings</h1>
          <SettingsForm />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;