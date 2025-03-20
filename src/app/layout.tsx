
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";


 export const metadata: Metadata = {
   title: "BudgetChain",
   description: "AI Powered Treasury Platform",
 };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body className="mt-10 bg-[#050512]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}