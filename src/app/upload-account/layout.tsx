// app/create-account/formLayout.tsx
'use client';
import { FormProvider } from './utils/formContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  // console.log("✅ layout.tsx is rendering");
  return <FormProvider>{children}</FormProvider>;
}
