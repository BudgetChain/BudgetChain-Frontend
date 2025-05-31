'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/app/hooks/use-mobile';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { HelpCenterHeader } from '@/app/dashboard/components/help-center/help-center-header';
import { TabsNavigation } from '@/app/dashboard/components/help-center/tabs/tabs-navigation';
import { FAQSection } from '@/app/dashboard/components/help-center/tabs/faq-section';
import { GuidesSection } from '@/app/dashboard/components/help-center/tabs/guides-section';
import { TroubleshootingSection } from '@/app/dashboard/components/help-center/tabs/troubleshooting-section';
import { SupportSection } from '@/app/dashboard/components/help-center/tabs/support-section';
import { SearchDialog } from '@/app/dashboard/components/help-center/search-dialogue';
import { MobileNavigation } from '@/app/dashboard/components/help-center/mobile-navigation';
import { LoadingSpinner } from '@/app/dashboard/components/help-center/loading-spinner';

export default function HelpCenterPage() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('faqs');
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock function to track article views
  const trackArticleView = (articleId: string) => {
    console.log(`Article viewed: ${articleId}`);
    // In a real implementation, this would send analytics data
  };

  // Toggle command dialog
  const toggleSearch = () => {
    setOpen(!open);
  };

  // Handle search keyboard shortcut
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      toggleSearch();
    }
  };

  return (
    <div
      className="min-h-screen bg-gray text-white h-screen overflow-auto box-border"
      style={{ margin: 0, padding: 0 }}
      onKeyDown={handleKeyDown}
    >
      <div className="container mx-auto px-2 md:px-4 max-w-7xl">
        {/* Header with search */}
        <HelpCenterHeader toggleSearch={toggleSearch} />

        {isLoading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Tabs */}
            <Tabs
              defaultValue="faqs"
              className="w-full"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab Contents */}
              <TabsContent
                value="faqs"
                className="space-y-0 md:space-y-0 animate-in fade-in-50 duration-300"
              >
                <FAQSection trackArticleView={trackArticleView} />
              </TabsContent>

              <TabsContent
                value="guides"
                className="space-y-0 animate-in fade-in-50 duration-300"
              >
                <GuidesSection trackArticleView={trackArticleView} />
              </TabsContent>

              <TabsContent
                value="troubleshooting"
                className="space-y-0 animate-in fade-in-50 duration-300"
              >
                <TroubleshootingSection trackArticleView={trackArticleView} />
              </TabsContent>

              <TabsContent
                value="support"
                className="space-y-0 animate-in fade-in-50 duration-300"
              >
                <SupportSection />
              </TabsContent>
            </Tabs>

            {/* Mobile Bottom Navigation */}
            {isMobile && (
              <MobileNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            )}
          </>
        )}

        {/* Search Dialog */}
        <SearchDialog
          open={open}
          setOpen={setOpen}
          setActiveTab={setActiveTab}
          trackArticleView={trackArticleView}
        />
      </div>
    </div>
  );
}
