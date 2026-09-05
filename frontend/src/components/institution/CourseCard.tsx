
import { categoryIcon, coverClass } from "../../types/types";


export default function CourseCard({ course, coverIndex, onManage }) {

  return (
    <div className="institution-course-card">
      <div className={`institution-course-cover ${coverClass(coverIndex)}`}>
        <div className="course-category">{course.course_category}</div>
        <div className="course-cover-icon">{categoryIcon(course.course_category)}</div>
      </div>

      <div className="institution-course-body">
        <div className={`course-status ${course.is_published ? "published" : "draft"}`}>
          <span />
          {course.is_published ? "Published" : "Draft"}
        </div>

        <h3>{course.course_name}</h3>
        <p className="course-description">{course.description}</p>

       

        <div className="course-info">
          <div>
            <strong>{0}</strong>
            <span>Modules</span>
          </div>
          <div>
            <strong>{0}</strong>
            <span>Students</span>
          </div>
          <div>
            <strong>-</strong>
            <span>Completion</span>
          </div>
        </div>

        <button className="manage-course" onClick={onManage}>
          {course.is_published ?  "Manage Course" : "Continue Editing"}
          <span> →</span>
        </button>
      </div>
    </div>
  );
}
