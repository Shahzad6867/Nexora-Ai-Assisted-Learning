import { useState } from "react";
import { useNavigate } from "react-router";
import "../../styles/instructor/InstructorTheme.css"
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import InstructorLayout from "../../components/instructor/InstructorLayout";
import InstructorSubjectCard from "../../components/instructor/InstructorSubjectCard";




export default function SubjectListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const {subjects} = useSelector((state : RootState) => state.instructor)


  return (
    <InstructorLayout >
      <div className="page-header">
        <div>
          <h1>Subjects</h1>
          <p>Manage learning content and academic activities for your assigned subjects</p>
        </div>
      </div>

      {/* <InstitutionToolbar 
       search={search}
       setSearch={setSearch}
       searchPlaceholder="Type instructors id / name / mail / personal email . . ."
       currentStatusFilter={"all"}
       itemsPerPage={5}
       setItemsPerPage={() => {}}
       setPage={() => {}}
       setStatusFilter={() => {}}
       status_filters={["all","Published","Draft","Archive"]}
       currentSortBy={"newest"}
       setSortBy={() => {}}
      /> */}



      <div className="subject-grid">
        {subjects.map((subject, i) => (
          <InstructorSubjectCard key={subject.subject_id} subject={subject} coverIndex={i} onManage={() => navigate(`/instructor/subjects/${subject.subject_id}`)} />
        ))}
        {subjects.length === 0 && (
          <p style={{ color: "var(--muted)", fontSize: 12 }}>No subjects found</p>
        )}
      </div>

    </InstructorLayout>
  );
}
