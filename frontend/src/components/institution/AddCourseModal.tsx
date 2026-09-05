import Modal from "./Modal";
import FileUpload from "./FileUpload";
import { COURSE_CATEGORIES, type CourseFormData } from "../../types/types";
import { toast } from "sonner";
import api from "../../api/api";
import { useForm, type FieldErrors } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../../pages/auth/Login.page";
import type { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities } from "../../features/institutionSlice";

interface CourseFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialCourse?: string;
  onClose: () => void;
}

export default function AddCourseModal({
  isOpen,
  mode,
  initialCourse,
  onClose,
}: CourseFormModalProps) {
  const { handleSubmit, reset, register } = useForm();
  const {token} = useSelector((state : RootState) => state.auth)
  const institutionToken = jwtDecode(token) as CustomJwtPayload;
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: CourseFormData) => {
    try {
      data.institution_id = institutionToken._id;
      const response = await api.post("/courses/new", data);
      toast.success(response.data.message);
      dispatch(fetchEntities(institutionToken._id));
      onClose();
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  const onError = (errors: FieldErrors<CourseFormData>) => {
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
      title={mode === "create" ? "Create New Course" : "Edit Course"}
      subtitle={
        mode === "create"
          ? "Start with the basic information. You can add modules and subjects later."
          : "Update your course information."
      }
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
            {mode === "create" ? "Create Course" : "Save Changes"}
          </button>
        </>
      }
    >
      <div className="form-grid">
        {/* Course Name */}
        <div className="form-group full">
          <label>
            Course Name <span>*</span>
          </label>
          <input
            placeholder="e.g. Full Stack Development"
            {...register("course_name", {
              required: "Course name is required",
              minLength: {
                value: 3,
                message: "Course name must be at least 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Course name cannot exceed 100 characters",
              },
            })}
          />
        </div>

        {/* Course Subtitle */}
        <div className="form-group full">
          <label>
            Course Subtitle <span>*</span>
          </label>
          <input
            placeholder="e.g. Master modern web development from scratch"
            {...register("course_subtitle", {
              required: "Course subtitle is required",
              minLength: {
                value: 10,
                message: "Subtitle must be at least 10 characters",
              },
              maxLength: {
                value: 200,
                message: "Subtitle cannot exceed 200 characters",
              },
            })}
          />
        </div>

        {/* Course Description */}
        <div className="form-group full">
          <label>
            Course Description <span>*</span>
          </label>
          <textarea
            placeholder="Describe what students will learn..."
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 20,
                message: "Description must be at least 20 characters",
              },
              maxLength: {
                value: 2000,
                message: "Description cannot exceed 2000 characters",
              },
            })}
          />
        </div>

        {/* Category */}
        <div className="form-group full">
          <label>
            Category <span>*</span>
          </label>
          <select
            {...register("course_category", {
              required: "Please select a category",
            })}
          >
            <option value="">Select category</option>
            {COURSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Course Price */}
        <div className="form-group">
          <label>
            Course Price <span>*</span>
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter course price"
            {...register("price", {
              required: "Course price is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Price cannot be negative",
              },
            })}
          />
        </div>

        {/* Price Per Module */}
        <div className="form-group">
          <label>
            Price Per Module <span>*</span>
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter price per module"
            {...register("price_per_module", {
              required: "Price per module is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Price per module cannot be negative",
              },
            })}
          />
        </div>

        <FileUpload
          label={mode === "create" ? "Course Banner" : "Replace Banner"}
          hint="Click to upload course banner · JPG, PNG · Recommended 16:9"
          fileName="hello"
          onFileSelected={() => {}}
          //   required={mode === "create"}
        />
      </div>
    </Modal>
  );
}
