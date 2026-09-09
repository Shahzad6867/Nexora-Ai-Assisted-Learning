import type { Module } from "../../types/types";

interface ModuleCardProps {
  module: Module;
  index: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ModuleCard({ module, index, onView, onEdit, onDelete }: ModuleCardProps) {
  return (
    <div className="module-card">
      <div className="module-top">
        <div className="module-left">
          <div className="module-number">{String(index + 1).padStart(2, "0")}</div>
          <div>
            <div className="module-name">{module.module_name}</div>
          <div className="module-subtitle">{module.description}</div>
          </div>
        </div>

        <div className="module-actions">
          <button className="btn btn-outline btn-small" onClick={onView}>
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

      <div className="module-meta">
        <div className="meta-pill">
          Total Marks: <strong>{module.total_marks}</strong>
        </div>
        <div className="meta-pill">
          Passing Marks: <strong>{module.passing_marks}</strong>
        </div>
        <div className="meta-pill">
          Assignment: <strong>{module.assignment_required ? "Required" : "No"}</strong>
        </div>

      </div>
    </div>
  );
}
