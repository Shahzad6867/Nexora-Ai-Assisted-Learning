import { useState } from "react";
import { useNavigate } from "react-router";
import InstitutionLayout from "../../components/institution/InstitutionLayout";
import CourseCard from "../../components/institution/CourseCard";
import AddCourseModal from "../../components/institution/AddCourseModal";
import "../../styles/institution/CourseTheme.css"
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { InstitutionToolbar } from "../../components/institution/InstitutionToolbar";



export default function CourseListPage() {
  const navigate = useNavigate();
  const {institution,courses} = useSelector((state : RootState) => state.institution)
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

 



  return (
    <InstitutionLayout name={institution?.institution_name}>
      <div className="page-header">
        <div>
          <h1>Courses</h1>
          <p>Create and manage your institution's learning programs.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
          + Create Course
        </button>
      </div>

      <InstitutionToolbar 
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
      />



      <div className="course-grid">
        {courses.map((course, i) => (
          <CourseCard key={course.course_id} course={course} coverIndex={i} onManage={() => navigate(`/institution/courses/${course.course_id}`)} />
        ))}
        {courses.length === 0 && (
          <p style={{ color: "var(--muted)", fontSize: 12 }}>No courses found</p>
        )}
      </div>

      <AddCourseModal
        isOpen={isCreateOpen}
        mode="create"
        onClose={() => setIsCreateOpen(false)}
      />

    </InstitutionLayout>
  );
}
