import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import InstitutionLayout from "../../components/institution/InstitutionLayout";
import ModuleCard from "../../components/institution/ModuleCard";
import ModuleFormModal from "../../components/institution/ModuleFormModal";
import EmptyState from "../../components/institution/EmptyState";
import type { CourseFormData, Module, ModuleFormData } from "../../types/types";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import api from "../../api/api";
import LoadingPage from "../Loader/Loading.page";
import { fetchEntities } from "../../features/institutionSlice";
import AddCourseModal from "../../components/institution/AddCourseModal";

export default function CourseDetailsPage() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { institution } = useSelector((state: RootState) => state.institution);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [moduleModal, setModuleModal] = useState<{
    mode: "create" | "edit";
    module?: Module;
  } | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchCourse = async (_id: string) => {
      try {
        const res = await api.get(`/courses/${_id}`);
        console.log(res);
        setCourse(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error || "an error occured");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse(_id);
  }, [institution, _id]);
  if (loading) {
    return <LoadingPage />;
  }

  if (!course) {
    return (
      <InstitutionLayout name={institution?.institution_name}>
        <p style={{ color: "var(--muted)" }}>This course could not be found.</p>
        <button
          className="btn btn-outline btn-small"
          onClick={() => navigate("/courses")}
        >
          ← Back to Courses
        </button>
      </InstitutionLayout>
    );
  }



  async function deleteModule(module_id: string) {
    toast(`Are you sure you want to delete this module?`, {
      duration: Infinity,
      classNames: {
        actionButton:
          "!bg-white !text-[#6650ff] hover:!bg-gray-200 !font-semibold",
        cancelButton:
          "!bg-white !text-[#6650ff] hover:!bg-gray-200 !font-semibold",
      },
      action: {
        label: "Confirm",
        onClick: () => {
          const updatePromise = api.delete(`/modules/${module_id}`);

          toast.promise(updatePromise, {
            loading: `Deleting module...`,
            success: (response) => {
              dispatch(fetchEntities(institution.institution_id));
              return response?.data?.message || `Module deleted successfully`;
            },
            error: (error) =>
              error?.response?.data?.error || `Failed to delete this module`,
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  }

  return (
    <InstitutionLayout name={institution?.institution_name}>
      <button
        className="detail-back"
        onClick={() => navigate("/institution/courses")}
      >
        ← Back to Courses
      </button>

      <div className="course-hero">
        <div className="hero-content">
          <div className="hero-badge">
            {course.course_category} ·{" "}
            {!course.isPublished ? "Draft" : "Published"}
          </div>
          <h1>{course.course_name}</h1>
          <p>{course.description}</p>
        </div>
        <div className="hero-actions">
          <button className="btn" onClick={() => setIsEditCourseOpen(true)}>
            Edit Course
          </button>
        </div>
      </div>

      <div className="course-metrics">
        <div className="metric-card">
          <span>Course Price</span>
          <strong>{course.price}</strong>
        </div>
        <div className="metric-card">
          <span>Modules</span>
          <strong>{course.modules.length}</strong>
        </div>
        <div className="metric-card">
          <span>Subjects</span>
          <strong>
            {course?.modules.reduce(
              (acc, module) => acc + (module.subjects?.length || 0),
              0
            )}
          </strong>
        </div>

        <div className="metric-card">
          <span>Students</span>
          <strong>{0}</strong>
        </div>
      </div>

      <div className="section-header">
        <div>
          <h2>Course Modules</h2>
          <p>Organize your course into modules or semesters.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setModuleModal({ mode: "create" })}
        >
          + Add Module
        </button>
      </div>

      {course.modules.length === 0 ? (
        <EmptyState
          icon="◈"
          title="No modules yet"
          description="Break this course down into modules to start organizing subjects."
          actionLabel="+ Add Module"
          onAction={() => setModuleModal({ mode: "create" })}
        />
      ) : (
        <div className="module-list">
          {course.modules.map((module, i) => (
            <ModuleCard
              key={module.module_id}
              module={module}
              index={i}
              onView={() =>
                navigate(
                  `/institution/courses/${_id}/modules/${module.module_id}`
                )
              }
              onEdit={() => setModuleModal({ mode: "edit", module })}
              onDelete={() => {
                deleteModule(module.module_id);
              }}
            />
          ))}
        </div>
      )}

      <AddCourseModal
        isOpen={isEditCourseOpen}
        mode="edit"
        initialCourse={course}
        onClose={() => setIsEditCourseOpen(false)}
      />

      <ModuleFormModal
        isOpen={moduleModal !== null}
        mode={moduleModal?.mode ?? "create"}
        initialModule={moduleModal?.module}
        onClose={() => setModuleModal(null)}
      />
    </InstitutionLayout>
  );
}
