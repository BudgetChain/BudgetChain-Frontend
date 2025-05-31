'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function AdminSettings() {
  // Mock settings data
  const [settings, setSettings] = useState({
    siteTitle: 'BudgetChain Platform',
    supportEmail: 'support@budgetchain.com',
    maintenanceMode: false,
    userRegistration: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
  });

  const handleSettingChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePasswordPolicyChange = (key: string, value: number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      passwordPolicy: {
        ...prev.passwordPolicy,
        [key]: value,
      },
    }));
  };

  const saveSettings = () => {
    // Here you would make an API call to save the settings
    console.log('Saving settings:', settings);
    // Log for audit
    console.log(`AUDIT LOG: System settings updated`, {
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-gray-500">
          Configure global system settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">General Settings</h3>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Site Title
              </label>
              <Input
                value={settings.siteTitle}
                onChange={(e) =>
                  handleSettingChange('siteTitle', e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Support Email
              </label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  handleSettingChange('supportEmail', e.target.value)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium">
                  Maintenance Mode
                </label>
                <span className="text-sm text-gray-500">
                  Temporarily disable access to the application
                </span>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  handleSettingChange('maintenanceMode', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium">
                  User Registration
                </label>
                <span className="text-sm text-gray-500">
                  Allow new users to register
                </span>
              </div>
              <Switch
                checked={settings.userRegistration}
                onCheckedChange={(checked) =>
                  handleSettingChange('userRegistration', checked)
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium">Security Settings</h3>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Session Timeout (minutes)
              </label>
              <Input
                type="number"
                min="5"
                max="120"
                value={settings.sessionTimeout}
                onChange={(e) =>
                  handleSettingChange(
                    'sessionTimeout',
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Max Login Attempts
              </label>
              <Input
                type="number"
                min="3"
                max="10"
                value={settings.maxLoginAttempts}
                onChange={(e) =>
                  handleSettingChange(
                    'maxLoginAttempts',
                    parseInt(e.target.value)
                  )
                }
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">
                Password Policy
              </label>

              <div className="grid gap-3 pl-2">
                <div>
                  <label className="block text-sm mb-1">Minimum Length</label>
                  <Input
                    type="number"
                    min="6"
                    max="16"
                    value={settings.passwordPolicy.minLength}
                    onChange={(e) =>
                      handlePasswordPolicyChange(
                        'minLength',
                        parseInt(e.target.value)
                      )
                    }
                    className="w-24"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="requireUppercase"
                    checked={settings.passwordPolicy.requireUppercase}
                    onChange={(e) =>
                      handlePasswordPolicyChange(
                        'requireUppercase',
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="requireUppercase" className="text-sm">
                    Require uppercase letter
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="requireNumbers"
                    checked={settings.passwordPolicy.requireNumbers}
                    onChange={(e) =>
                      handlePasswordPolicyChange(
                        'requireNumbers',
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="requireNumbers" className="text-sm">
                    Require numbers
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="requireSpecialChars"
                    checked={settings.passwordPolicy.requireSpecialChars}
                    onChange={(e) =>
                      handlePasswordPolicyChange(
                        'requireSpecialChars',
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="requireSpecialChars" className="text-sm">
                    Require special characters
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={saveSettings}>Save Settings</Button>
      </div>
    </div>
  );
}
