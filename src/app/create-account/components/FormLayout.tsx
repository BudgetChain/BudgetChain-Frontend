// app/create-account/layout.tsx
"use client";

import { FormProvider } from "../utils/formContext";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider>
      {children}
    </FormProvider>
  );
}