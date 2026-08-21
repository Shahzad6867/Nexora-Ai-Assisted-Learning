import type { ReactNode } from "react";
import InstitutionSidebar from "./InstitutionSidebar";
import InstitutionTopbar from "./InstitutionTopbar";

interface InstitutionLayoutProps {
  name: string;
  children: ReactNode;
}

export default function InstitutionLayout({ name, children }: InstitutionLayoutProps) {
  return (
    <div className="app">
      <InstitutionSidebar  />
      <main className="main">
        <InstitutionTopbar  name={name} />
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
