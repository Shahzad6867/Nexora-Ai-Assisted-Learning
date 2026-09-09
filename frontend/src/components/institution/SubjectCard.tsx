import type { Subject } from "../../types/types";
import File2FillIcon from '@iconify-react/mage/file-2-fill';
interface SubjectCardProps {
  subject: Subject;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SubjectCard({ subject, onEdit, onDelete }: SubjectCardProps) {
  return (
    <div className="subject-card">
      <div className="subject-left">
        <div className="subject-icon"><File2FillIcon height="1.5em"/></div>
        <div>
          <div className="subject-name">{subject.subject_name}</div>
          <div className="subject-instructor">
            Instructor: {subject.instructor_id}
            {/* {subject?.chapters.length > 0 && ` · 0 Chapters`} */}
          </div>
        </div>
      </div>

      <div className="subject-actions">
      <button className="btn btn-outline btn-small" >
          View
        </button>
        <button className="btn btn-secondary btn-small" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-small" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
