'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from "../LandingFeature/sidebar"; 


export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 h-full min-w-[250px] min-h-screen bg-[#171720] text-white p-4 border border-red-500"
      >
        <div className="border border-yellow-500">
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
