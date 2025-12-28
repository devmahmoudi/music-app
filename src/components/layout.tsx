import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <main className={`min-h-screen ${className}`}>
      {children}
    </main>
  );
}