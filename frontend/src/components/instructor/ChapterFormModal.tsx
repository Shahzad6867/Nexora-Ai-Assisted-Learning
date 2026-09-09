import { useEffect, useState } from "react";
import Modal from "./Modal";
import FileUpload from "./FileUpload";
import type { Chapter, ChapterStatus } from "../,,/../../types/types";
import { useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import api from "../../api/api";
import { useParams } from "react-router";

interface ChapterFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialChapter?: Chapter;
  onClose: () => void;
}


export default function ChapterFormModal({ isOpen, mode, initialChapter, onClose}: ChapterFormModalProps) {
  const {register,handleSubmit,setValues, reset} = useForm()
  const [error, setError] = useState<string | null>(null);
  const {subjectId} = useParams()
  useEffect(() => {
    if (!isOpen) return;
    if (mode === "edit" && initialChapter) {
      initialChapter.is_published = initialChapter.is_published ? "published" : "draft"
      setValues(initialChapter)
    }
  }, [isOpen, mode, initialChapter]);

  async function onSubmit(data: any) {
    try {
      data.subject_id = subjectId
      data.is_published = data.is_published !== "draft"
      const response =
        mode === "create"
          ? await api.post("/chapters/new", data)
          : await api.put(`/chapters/${initialChapter.chapter_id}`, data);
      toast.success(response.data.message);
      onClose();
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  }

  const onError = (errors: FieldErrors) => {
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
      onClose={onClose}
      title={mode === "create" ? "Add New Chapter" : "Edit Chapter"}
      subtitle="Create the chapter and attach its learning resources."
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit(onSubmit,onError)}>
            Save Chapter
          </button>
        </>
      }
    >
      <div className="form-grid">
        <div className="form-group full">
          <label>
            Chapter Name <span>*</span>
          </label>
          <input
            placeholder="e.g. Introduction to Data Structures"
            {...register("chapter_name", {
              minLength: {
                value: 3,
                message: "Chapter name must be at least 3 characters long",
              },
              maxLength: {
                value: 100,
                message: "Chapter name cannot exceed 100 characters",
              },
              required: "Chapter name is required",
            })}
          />
        </div>

        <FileUpload
          fileName="File Name"
          label="Upload Study Material"
          hint="PDF files only · Maximum 50 MB · optional for drafts"
          accept=".pdf"
          onFileSelected={() => {}}
        />

        <FileUpload
          fileName="File Name"
          label="Upload Tutorial Class"
          hint="MP4, MOV or WebM · optional for drafts"
          accept="video/*"
          onFileSelected={() => {}}
        />

        <div className="form-group full">
          <label>
            Chapter Status <span>*</span>
          </label>
          <select
          {...register("is_published", {
            required: "Please select a chapter status",
          })}
          >
            <option value="">Select an option</option>
            <option value="draft">Save as Draft</option>
            <option value="published">Publish Chapter</option>
          </select>
          <p className="form-hint">Drafts can be saved without material or a video — publishing requires both.</p>
        </div>

      </div>
    </Modal>
  );
}
