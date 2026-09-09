import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import InstitutionLayout from "../../components/institution/InstitutionLayout";
import SubjectCard from "../../components/institution/SubjectCard";
import SubjectFormModal from "../../components/institution/SubjectFormModal";
import ModuleFormModal from "../../components/institution/ModuleFormModal";
import EmptyState from "../../components/institution/EmptyState";
import type {
  ModuleFormData,
  Subject,
  SubjectFormData,
} from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../app/store";
import api from "../../api/api";
import { toast } from "sonner";
import { fetchEntities } from "../../features/institutionSlice";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../auth/Login.page";

export default function ModuleDetailsPage() {
  const [module, setModule] = useState(null);
  const { courseId, moduleId } = useParams();
  const { institution } = useSelector((state: RootState) => state.institution);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const {token} = useSelector((state : RootState) => state.auth)
  const institutionToken = jwtDecode(token) as CustomJwtPayload
  const [isEditModuleOpen, setIsEditModuleOpen] = useState(false);
  const [subjectModal, setSubjectModal] = useState<{
    mode: "create" | "edit";
    subject?: Subject;
  } | null>(null);
  const [loading,setLoading] = useState(true)
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);

  useEffect(() => {
    if (!moduleId || !courseId) return; 
    dispatch(fetchEntities(institutionToken._id))
    async function fetchModule(moduleId: string) {
      try {
        const response = await api.get(`/modules/${moduleId}`);
        setModule(response.data.data);
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.error ?? "an error occured")
        setLoading(false)
      }finally{
        setLoading(false)
      }
    }
    fetchModule(moduleId);

  },[moduleId]);


  if (!module) {
    return (
      <InstitutionLayout name={institution?.institution_name}>
        <p style={{ color: "var(--muted)" }}>This module could not be found.</p>
        <button
          className="btn btn-outline btn-small"
          onClick={() => navigate(`/institution/courses/${courseId}`)}
        >
          ← Back to Course
        </button>
      </InstitutionLayout>
    );
  }

  function handleEditModule(data: ModuleFormData) {
    setIsEditModuleOpen(false);
  }

  return (
    <InstitutionLayout name={institution?.institution_name}>
      <button
        className="detail-back"
        onClick={() =>
          navigate(`/institution/courses/${courseId}`)
        }
      >
        ← Back to Course
      </button>

      <div className="module-hero">
        <div className="module-hero-top">
          <div>
            {/* <div className="hero-badge" style={{ display: "inline-block", color: "var(--primary)", background: "var(--primary-light)" }}>
              Module {String(moduleIndex + 1).padStart(2, "0")}
            </div> */}
            <h1 style={{fontWeight : "600"}}>{module.module_name}</h1>
            <p>{module.description}</p>
          </div>
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditModuleOpen(true)}
            >
              Edit Module
            </button>
          </div>
        </div>

        <div className="module-badges">
          <div className="meta-pill">
            Total Marks: <strong>{module.total_marks}</strong>
          </div>
          <div className="meta-pill">
            Passing Marks: <strong>{module.passing_marks}</strong>
          </div>
          <div className="meta-pill">
            Assignment:{" "}
            <strong>
              {module.assignment_required ? "Required" : "Not Required"}
            </strong>
          </div>
        </div>
      </div>

      <div className="section-header">
        <div>
          <h2>Subjects</h2>
          <p>Create subjects and assign instructors.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setSubjectModal({ mode: "create" })}
        >
          + Add Subject
        </button>
      </div>

      {module?.subjects.length === 0 ? (
        <EmptyState
          icon="◈"
          title="No subjects yet"
          description="Add subjects to this module and assign an instructor to each."
          actionLabel="+ Add Subject"
          onAction={() => setSubjectModal({ mode: "create" })}
        />
      ) : (
        <div className="subject-list">
          {module.subjects.map((subject) => (
            <SubjectCard
              key={subject.subject_id}
              subject={subject}
              onEdit={() => setSubjectModal({ mode: "edit", subject })}
              onDelete={() => setDeletingSubject(subject)}
            />
          ))}
        </div>
      )}

      <ModuleFormModal
        isOpen={isEditModuleOpen}
        mode="edit"
        initialModule={module}
        onClose={() => setIsEditModuleOpen(false)}
      />

      <SubjectFormModal
        isOpen={subjectModal !== null}
        mode={subjectModal?.mode ?? "create"}
        initialSubject={subjectModal?.subject}
        onClose={() => setSubjectModal(null)}
        setModule={setModule}
      />
    </InstitutionLayout>
  );
}
