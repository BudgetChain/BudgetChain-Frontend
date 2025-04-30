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

const SettingsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
    <div className="px-6 pb-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Settings</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="preferences" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] bg-[#171720] border border-[#EBEBEB40]">
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
          
          <TabsContent value="preferences">
            <Card className="border border-[#EBEBEB40] bg-[#171720]">
              <CardHeader>
                <CardTitle className="text-white">User Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-white">Language</Label>
                  <Input 
                    id="language" 
                    {...register("language")}
                    placeholder="Select your preferred language" 
                    className="bg-[#1E1E2E] border-[#EBEBEB40] text-white"
                  />
                  {errors.language && (
                    <p className="text-red-500 text-sm">{errors.language.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-white">Timezone</Label>
                  <Input 
                    id="timezone" 
                    {...register("timezone")}
                    placeholder="Select your timezone" 
                    className="bg-[#1E1E2E] border-[#EBEBEB40] text-white"
                  />
                  {errors.timezone && (
                    <p className="text-red-500 text-sm">{errors.timezone.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme" className="text-white">Theme</Label>
                  <Input 
                    id="theme" 
                    {...register("theme")}
                    placeholder="Select your theme preference" 
                    className="bg-[#1E1E2E] border-[#EBEBEB40] text-white"
                  />
                  {errors.theme && (
                    <p className="text-red-500 text-sm">{errors.theme.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="border border-[#EBEBEB40] bg-[#171720]">
              <CardHeader>
                <CardTitle className="text-white">Notification Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Email Notifications</Label>
                    <p className="text-sm text-gray-400">
                      Receive notifications via email
                    </p>
                  </div>
                  <Input 
                    type="checkbox" 
                    {...register("emailNotifications")}
                    className="w-4 h-4 bg-[#1E1E2E] border-[#EBEBEB40] text-[#6366F1]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Push Notifications</Label>
                    <p className="text-sm text-gray-400">
                      Receive push notifications
                    </p>
                  </div>
                  <Input 
                    type="checkbox" 
                    {...register("pushNotifications")}
                    className="w-4 h-4 bg-[#1E1E2E] border-[#EBEBEB40] text-[#6366F1]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Project Updates</Label>
                    <p className="text-sm text-gray-400">
                      Get notified about project updates
                    </p>
                  </div>
                  <Input 
                    type="checkbox" 
                    {...register("projectUpdates")}
                    className="w-4 h-4 bg-[#1E1E2E] border-[#EBEBEB40] text-[#6366F1]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button 
            type="submit"
            className="w-full bg-[#6366F1] hover:bg-[#4F46E5]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;