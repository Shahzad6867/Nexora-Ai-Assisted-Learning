import { useState } from "react";
import Modal from "./Modal";
import FileUpload from "./FileUpload";
import { useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import api from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../app/store";
import { fetchEntities } from "../../features/institutionSlice";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../../pages/auth/Login.page";

interface AddInstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Instructor {
  institution_id: string;
  instructor_mail: string;
  instructor_password: string;
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth: Date;
  personal_email: string;
  about: string;
  qualification: {
    title: string;
    type: string;
    institution: string;
    issue_date: Date;
    document_url: string;
  };
}

const QUALIFICATION_TYPES = [
  "Degree",
  "Diploma",
  "Certification",
  "PhD",
  "Skill",
  "Other",
];

export default function AddInstructorModal({
  isOpen,
  onClose,
}: AddInstructorModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const ageValue = watch("age");
  const { institution } = useSelector((state: RootState) => state.institution);
  const token = localStorage.getItem("token")
  const dispatch = useDispatch<AppDispatch>();
  const institutionToken = jwtDecode(token) as CustomJwtPayload;
  const onSubmit = async (data: Instructor) => {
    try {
      data.institution_id = institutionToken._id;
      const response = await api.post(`/institution/instructor/new`, data);
      dispatch(fetchEntities(institutionToken._id));
      onClose();
      reset();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const onError = (errors: FieldErrors<Instructor>) => {
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
      title="Add Instructor"
      subtitle="Create an account for a new instructor at your institution."
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Create Instructor
          </button>
        </>
      }
    >
      <div className="form">
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Jane"
            {...register("first_name", {
              required: "First Name is required",
              maxLength: {
                value: 40,
                message: "Invalid first name",
              },
            })}
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            {...register("last_name", {
              required: "Last Name is required",
              maxLength: {
                value: 40,
                message: "Invalid last name",
              },
            })}
          />
        </div>

        <div className="field">
          <label>Age</label>
          <input
            type="number"
            min={18}
            placeholder="34"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: {
                value: 18,
                message: "Instructors must be at least 18 years old.",
              },
            })}
          />
        </div>
        <div className="field">
          <label>Date of Birth</label>
          <input
            type="date"
            {...register("date_of_birth", {
              required: "Date of Birth is required",
              validate: (value) => {
                if (isNaN(ageValue)) return "Age is required";
                const today = new Date();
                const birthDate = new Date(value);

                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                if (
                  monthDiff < 0 ||
                  (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ) {
                  age--;
                }
                if (age < 18)
                  return "Instructors must be at least 18 years old.";
                else if (age !== ageValue)
                  return "Age does not match Date of Birth";
              },
            })}
          />
        </div>

        <FileUpload
          label="Upload instructor image"
          hint="JPEG,PNG,JPG · Maximum 10MB"
          fileName={""}
          onFileSelected={(fileName) => {}}
          accept="image/*"
        />

        <div className="field full">
          <label>Instructor Email (used to log in)</label>
          <input
            type="email"
            placeholder="jane.doe@institution.edu"
            {...register("instructor_mail", {
              required: "Instructor mail is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid instructor mail format",
              },
            })}
          />
        </div>

        <div className="field full">
          <label>Personal Email </label>
          <input
            type="email"
            placeholder="jane.personal@example.com"
            {...register("personal_email", {
              required: "Personal mail is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid personal mail format",
              },
            })}
          />
        </div>


        <div className="field full">
          <label>Password</label>
          <div className="password-row">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              {...register("instructor_password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, a number, and a special character.",
                },
              })}
            />
          </div>
        </div>

        <div className="field full">
          <label>About</label>
          <textarea
            placeholder="A short bio for this instructor's profile..."
            {...register("about", {
              required: "About is required",
            })}
          />
        </div>
      </div>

      <div className="section-divider">Qualification</div>

      <div className="form">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            placeholder="MSc Computer Science"
            {...register("qualification.title", {
              required: "Qualification title is required",
            })}
          />
        </div>
        <div className="field">
          <label>Type</label>
          <select
            {...register("qualification.type", {
              required: "Qualification type is required",
            })}
          >
            <option value="">Select type</option>
            {QUALIFICATION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Issuing Institution</label>
          <input
            type="text"
            placeholder="Stanford University"
            {...register("qualification.institution", {
              required: "Qualification Institution is required",
            })}
          />
        </div>
        <div className="field">
          <label>Issue Date</label>
          <input
            type="date"
            {...register("qualification.issue_date", {
              required: "Qualification issue date is required",
            })}
          />
        </div>

        <FileUpload
          label="Upload qualification document"
          hint="PDF · Maximum 10MB"
          fileName={""}
          onFileSelected={(fileName) => {}}
          accept="application/pdf"
        />
      </div>
    </Modal>
  );
}
