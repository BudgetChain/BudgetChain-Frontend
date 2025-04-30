export const metadata = {
    title: 'BudgetChain',
    description: 'BudgetChain Application',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }