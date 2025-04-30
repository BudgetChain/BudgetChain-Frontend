'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const settingsSchema = z.object({
  language: z.string().min(1, "Language is required"),
  timezone: z.string().min(1, "Timezone is required"),
  theme: z.string().min(1, "Theme is required"),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  projectUpdates: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const defaultValues: SettingsFormValues = {
  language: 'en',
  timezone: 'UTC',
  theme: 'dark',
  emailNotifications: true,
  pushNotifications: true,
  projectUpdates: true,
};

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

const timezoneOptions = [
  { value: 'UTC', label: 'UTC' },
  { value: 'EST', label: 'Eastern Time' },
  { value: 'PST', label: 'Pacific Time' },
  { value: 'CET', label: 'Central European Time' },
];

const themeOptions = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
];

export const SettingsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  React.useEffect(() => {
    // Load settings from localStorage on component mount
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      reset(JSON.parse(savedSettings));
    }
  }, [reset]);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(data));
      
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 bg-[#171720] border border-[#EBEBEB40] mb-4">
          <TabsTrigger 
            value="preferences" 
            className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
          >
            Preferences
          </TabsTrigger>
          <TabsTrigger 
            value="notifications"
            className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <div className="w-full">
          <TabsContent value="preferences">
            <Card className="border border-[#EBEBEB40] bg-[#171720] w-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-white">User Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-white">Language</Label>
                    <Select
                      value={watch("language")}
                      onValueChange={(value) => setValue("language", value)}
                    >
                      <SelectTrigger className="bg-[#1E1E2E] border-[#EBEBEB40] text-white w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E1E2E] border-[#EBEBEB40]">
                        {languageOptions.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="text-white hover:bg-[#6366F1]"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.language && (
                      <p className="text-red-500 text-sm">{errors.language.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-white">Timezone</Label>
                    <Select
                      value={watch("timezone")}
                      onValueChange={(value) => setValue("timezone", value)}
                    >
                      <SelectTrigger className="bg-[#1E1E2E] border-[#EBEBEB40] text-white w-full">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E1E2E] border-[#EBEBEB40]">
                        {timezoneOptions.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="text-white hover:bg-[#6366F1]"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.timezone && (
                      <p className="text-red-500 text-sm">{errors.timezone.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="theme" className="text-white">Theme</Label>
                    <Select
                      value={watch("theme")}
                      onValueChange={(value) => setValue("theme", value)}
                    >
                      <SelectTrigger className="bg-[#1E1E2E] border-[#EBEBEB40] text-white w-full">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E1E2E] border-[#EBEBEB40]">
                        {themeOptions.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="text-white hover:bg-[#6366F1]"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.theme && (
                      <p className="text-red-500 text-sm">{errors.theme.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="border border-[#EBEBEB40] bg-[#171720] w-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-white">Notification Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-center justify-between p-4 bg-[#1E1E2E] rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-gray-400">
                        Receive notifications via email
                      </p>
                    </div>
                    <Input 
                      type="checkbox" 
                      {...register("emailNotifications")}
                      className="w-4 h-4 bg-[#1E1E2E] border-[#EBEBEB40] text-[#6366F1] cursor-pointer"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-[#1E1E2E] rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-white">Push Notifications</Label>
                      <p className="text-sm text-gray-400">
                        Receive push notifications
                      </p>
                    </div>
                    <Input 
                      type="checkbox" 
                      {...register("pushNotifications")}
                      className="w-4 h-4 bg-[#1E1E2E] border-[#EBEBEB40] text-[#6366F1] cursor-pointer"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-[#1E1E2E] rounded-lg md:col-span-2">
                    <div className="space-y-0.5">
                      <Label className="text-white">Project Updates</Label>
                      <p className="text-sm text-gray-400">
                        Get notified about project updates
                      </p>
                    </div>
                    <Input 
                      type="checkbox" 
                      {...register("projectUpdates")}
                      className="w-4 h-4 bg-[#1E1E2E] border-[#EBEBEB40] text-[#6366F1] cursor-pointer"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <div className="mt-4">
        <Button 
          type="submit"
          className="w-full md:w-auto px-8 bg-[#6366F1] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  );
}; 