'use client';

import { useState } from 'react';
import AdminSummary from './summary';
import AIChat from './chartSection';
import TransactionTable from './transactionTable';
import UserManagement from './userManagement';
import RolePermissions from './rolePermissions';
import AdminSettings from './adminSettings';
import SystemMonitoring from './systemMonitoring';
import AuditLogs from './auditLogs';

const TABS = {
  DASHBOARD: 'dashboard',
  USERS: 'users',
  ROLES: 'roles',
  SETTINGS: 'settings',
  MONITORING: 'monitoring',
  AUDIT: 'audit',
};

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);

  return (
    <div className="flex flex-col space-y-6">
      <div className="mt-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">
          Manage your application, users, and settings
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {Object.entries(TABS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTab(value)}
              className={`py-4 px-1 border-b-2 font-medium text-sm 
                ${
                  activeTab === value
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-white hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {key.charAt(0) + key.slice(1).toLowerCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6 text-white">
        {activeTab === TABS.DASHBOARD && (
          <div className="space-y-6">
            <AdminSummary />
            <AIChat />
            <TransactionTable />
          </div>
        )}

        {activeTab === TABS.USERS && <UserManagement />}
        {activeTab === TABS.ROLES && <RolePermissions />}
        {activeTab === TABS.SETTINGS && <AdminSettings />}
        {activeTab === TABS.MONITORING && <SystemMonitoring />}
        {activeTab === TABS.AUDIT && <AuditLogs />}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
