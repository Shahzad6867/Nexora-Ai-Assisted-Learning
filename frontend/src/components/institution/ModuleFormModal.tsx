import { useEffect, useState } from "react";
import Modal from "./Modal";
import type { Module, ModuleFormData } from "../../types/types";
import { useForm, type FieldErrors } from "react-hook-form";
import { useParams } from "react-router";
import api from "../../api/api";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchEntities } from "../../features/institutionSlice";

interface ModuleFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialModule?: Module;
  onClose: () => void;
}

export default function ModuleFormModal({
  isOpen,
  mode,
  initialModule,
  onClose,
}: ModuleFormModalProps) {
  const { institution } = useSelector((state: RootState) => state.institution);

  const { _id } = useParams();
  const { register, handleSubmit, reset, setValues } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!isOpen) return;
    if (mode === "edit" && initialModule) {
      setValues({
        module_name: initialModule.module_name,
        description: initialModule.description,
        total_marks: initialModule.total_marks,
        passing_marks: initialModule.passing_marks,
        assignment_required: initialModule.assignment_required ? "yes" : "no",
      });
    }
  }, [isOpen, mode, initialModule]);

  async function onSubmit(data: any) {
    try {
      const dto: ModuleFormData = {
        ...data,
        course_id: _id,
        assignment_required: data.assignment_required === "yes",
      };
      const response =
        mode === "create"
          ? await api.post("/modules/new", dto)
          : await api.put(`/modules/${initialModule.module_id}`, dto);
      toast.success(response.data.message);
      dispatch(fetchEntities(institution.institution_id));
      onClose();
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  }

  const onError = (errors: FieldErrors<ModuleFormData>) => {
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
      title={mode === "create" ? "Add Module" : "Edit Module"}
      subtitle="Define the structure and assessment requirements."
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
            Save Module
          </button>
        </>
      }
    >
      <div className="form-grid">
        {/* Module Name */}
        <div className="form-group full">
          <label>
            Module Name <span>*</span>
          </label>
          <input
            placeholder="e.g. Fundamentals of Web Development"
            {...register("module_name", {
              minLength: {
                value: 3,
                message: "Module name must be at least 3 characters long",
              },
              maxLength: {
                value: 100,
                message: "Module name cannot exceed 100 characters",
              },
              required: "Module name is required",
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

        {/* Total Marks */}
        <div className="form-group">
          <label>
            Total Marks <span>*</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 100"
            {...register("total_marks", {
              required: "Total marks are required",
              valueAsNumber: true, // Automatically casts string input to native JavaScript number
              min: { value: 1, message: "Marks must be greater than 0" },
            })}
          />
        </div>

        {/* Passing Marks */}
        <div className="form-group">
          <label>
            Passing Marks <span>*</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 40"
            {...register("passing_marks", {
              required: "Passing marks are required",
              valueAsNumber: true, // Automatically casts string input to native JavaScript number
              min: { value: 0, message: "Passing marks cannot be negative" },
            })}
          />
        </div>

        {/* Assignment Required Dropdown */}
        <div className="form-group full">
          <label>
            Assignment Required? <span>*</span>
          </label>
          <select
            {...register("assignment_required", {
              required: "Please select an option",
            })}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes — Assignment is required</option>
            <option value="no">No — Assignment is not required</option>
          </select>
        </div>
      </div>
    </Modal>
  );
}
