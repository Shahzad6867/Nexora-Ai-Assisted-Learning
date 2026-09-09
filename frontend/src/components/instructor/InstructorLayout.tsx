import type { ReactNode } from "react";
import InstructorSidebar from "./InstructorSidebar";
import InstructorTopbar from "./InstructorTopbar";


export default function InstructorLayout({ children }) {
  return (
    <div className="app">
      <InstructorSidebar  />
      <main className="main">
        <InstructorTopbar  />
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
