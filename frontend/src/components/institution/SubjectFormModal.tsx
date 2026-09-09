import { useEffect, useState } from "react";
import Modal from "./Modal";
import {
  INSTRUCTOR_OPTIONS,
  type Subject,
  type SubjectFormData,
} from "../../types/types";
import { useForm, type FieldErrors } from "react-hook-form";
import api from "../../api/api";
import { toast } from "sonner";
import { fetchEntities } from "../../features/institutionSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useParams } from "react-router";

interface SubjectFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialSubject?: Subject;
  onClose: () => void;
  setModule : any
}

export default function SubjectFormModal({
  isOpen,
  mode,
  initialSubject,
  onClose,
  setModule
}: SubjectFormModalProps) {
  const { register, handleSubmit, reset, setValues } = useForm();
  const { moduleId } = useParams();
  const { institution, instructors } = useSelector(
    (state: RootState) => state.institution
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isOpen) return;
    if (mode === "edit" && initialSubject) {
      setValues(initialSubject);
    }
  }, [isOpen, mode, initialSubject]);

  const onSubmit = async (data: any) => {
    try {
      if (mode === "edit") {
        data.module_id = moduleId;
      }
      const dto: SubjectFormData = data;
      const response = mode === "create" ? await api.post(`/subjects/new`, dto) : await api.put(`/subjects/${initialSubject.subject_id}`,dto)
      toast.success(response.data.message);
      const updatedModuleResponse = await api.get(`/modules/${moduleId}`)
      setModule(updatedModuleResponse.data.data)
      onClose();
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  const onError = (errors: FieldErrors<SubjectFormData>) => {
    const errorValues = Object.values(errors);
    if (errorValues.length > 0) {
      const firstError: any = errorValues[0];
      if (firstError?.message) {
        toast.error(firstError.message);
      } else if (typeof firstError === "object") {
        const nestedError: any = Object.values(firstError)[0];
        if (nestedError?.message) {
          toast.error(nestedError.message);
        }
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      title={mode === "create" ? "Add Subject" : "Edit Subject"}
      subtitle="Create a subject and assign an instructor."
      footer={
        <>
          <button
            className="btn btn-secondary"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Save Subject
          </button>
        </>
      }
    >
      <div className="form-grid">
        <div className="form-group full">
          <label>
            Subject Name <span>*</span>
          </label>
          <input
            placeholder="e.g. JavaScript Fundamentals"
            {...register("subject_name", {
              minLength: {
                value: 3,
                message: "Subject name must be at least 3 characters long",
              },
              maxLength: {
                value: 100,
                message: "Subject name cannot exceed 100 characters",
              },
              required: "Subject name is required",
            })}
          />
        </div>

        <div className="form-group full">
          <label>
            Description <span>*</span>
          </label>
          <textarea
            placeholder="e.g. Core concepts and foundations"
            {...register("description", {
              minLength: {
                value: 10,
                message:
                  "Description should be descriptive (at least 10 characters)",
              },
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters",
              },
              required: "Description is required",
            })}
          />
        </div>

        <div className="form-group full">
          <label>
            Assign Instructor <span>*</span>
          </label>
          <select
            {...register("instructor_id", {
              required: "Please assign a instructor",
            })}
          >
            <option value="">Select Instructor</option>
            {instructors.map((opt) => (
              <option key={opt.instructor_id} value={opt.instructor_id}>
                {opt.first_name} {opt.last_name} - {opt.instructor_id}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
}
