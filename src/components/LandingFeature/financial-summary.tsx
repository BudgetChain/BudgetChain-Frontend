import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Montserrat } from "next/font/google";


interface FinancialSummaryProps {
  title: string;
  amount: string;
  subtitle?: string;
  type: 'total' | 'received' | 'withdrawn';
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export function FinancialSummary({
  title,
  amount,
  subtitle,
  type,
}: FinancialSummaryProps) {
  const getGradient = () => {
    switch (type) {
      case 'total':
        return 'from-[#894DBD] to-[#5E5EFF]';
      case 'received':
        return 'from-[#894DBD] to-[#5E5EFF]';
      case 'withdrawn':
        return 'from-[#894DBD] to-[#5E5EFF]';
      default:
        return 'from-[#894DBD] to-[#5E5EFF]';
    }
  };
  

  return (
    <Card className={cn('bg-gradient-to-b border-none', getGradient(), montserrat.variable)}>
      <CardHeader className="pb-1">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="text-base font-normal leading-[100%] tracking-[0%] text-white/80">
            {title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="border-none bg-inherit shadow-none text-xs text-white font-thin hover:bg-inherit">
                STRK <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="p-0 border-none bg-inherit shadow-none text-white text-sm font-montserrat font-extralight"
            >
              <DropdownMenuItem className="p-0">STRK</DropdownMenuItem>
              <DropdownMenuItem className="p-0">USDC</DropdownMenuItem>
              <DropdownMenuItem className="p-0">ETH</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-montserrat text-white">{amount}</div>
        {subtitle && <p className="text-xs text-white/70 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
