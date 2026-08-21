import { useCallback, useEffect, useRef, useState } from "react";
import "../../styles/InstitutionOnboarding.css";
import { useForm, type FieldErrors } from "react-hook-form";
import api from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchEntities, updateProfile } from "../../features/institutionSlice";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import LoadingPage from "../Loader/Loading.page";

export interface PrimaryContact {
  person_name: string;
  designation: string;
  official_mail: string;
  phone_number: string;
  alternate_phone_number: string;
}

export interface InstitutionAddress {
  country: string;
  state: string;
  city: string;
  postal_code: string;
  full_address: string;
}

export interface LegalInformation {
  legal_organization_name: string;
  registration_number: string;
  registration_authority: string;
  tax_identification_number: string;
  accreditation_body: string;
  legal_document: string | FileList;
}

export interface BankInformation {
  legal_organization_name: string;
  bank_name: string;
  account_number: string;
  swift_code: string;
  iban_number: string;
}

export interface StatusTimelineEntry {
  status: string;
  date: string;
  note?: string;
}

export interface Institution {
  institution_name: string;
  institution_email: string;
  description: string;
  year_established: string;
  official_website: string;
  institution_logo: string | FileList;
  primary_contact: PrimaryContact;
  address: InstitutionAddress;
  legal_information: LegalInformation;
  bank_information: BankInformation;
  terms_acceptance: boolean;
  policy_acceptance: boolean;
  educational_consent: boolean;
  isVerified: boolean;
  status_timeline: StatusTimelineEntry[];
}

const STEPS = ["Institution", "Contact", "Address", "Legal", "Bank", "Review"];

export default function InstitutionOnboardingPage() {
  const legalDocumentInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate()
  const [legalDocumentName, setLegalDocumentName] = useState("");
  const [isDocumentDragging, setIsDocumentDragging] = useState(false);

  const [logoName, setLogoName] = useState("");
  const [isLogoDragging, setIsLogoDragging] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const { register, handleSubmit, reset, setValue, clearErrors } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { institution,loading } = useSelector((state: RootState) => state.institution);
  const { request } = useSelector((state: RootState) => state.request);

  const params = useParams();

  useEffect(() => {
    dispatch(fetchEntities(params.id));
  }, [dispatch, params.id]);

  const resetAsyncForm = useCallback(() => {
    if (institution) {
      const date = institution.year_established;
      const formattedDate = date
        ? new Date(date).toISOString().split("T")[0]
        : "";
      reset({
        ...institution,
        year_established: formattedDate,
      });
    }
  }, [institution, reset]);

  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);

  // Explicitly register file fields for React Hook Form validation
  useEffect(() => {
    register("institution_logo", { required: "Institution Logo is required" });
    register("legal_information.legal_document", {
      required: "Legal Document is required",
    });
  }, [register]);

  const handleFileSelect = (
    file: File | undefined,
    fieldName: "institution_logo" | "legal_information.legal_document",
    setFileName: (name: string) => void
  ) => {
    if (!file) return;

    setFileName(file.name);
    setValue(fieldName, file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    clearErrors(fieldName);
  };

  const onSubmit = async (data: any) => {
    try {
      const payload = { ...data };
      delete payload.institution_logo;
      if (payload.legal_information) {
        delete payload.legal_information.legal_document;
      }

      if (payload.terms_acceptance) {
        payload.policy_acceptance = true;
      }

      const response = await api.patch(`/institution/${params.id}`, payload);
      dispatch(updateProfile(response.data.institution));
      if (currentStep === 6) {
        if(request === null){
          const newRequest = {
            submitted_by: params.id,
            request_type: "Institution Onboarding Request",
            note: data?.note,
          };
         const response = await api.post("/requests/new",newRequest);
          navigate(`/institution/requests/${response.data.request.request_id}`)
        }else{
          const response = await api.put(`/requests/${request.request_id}/resubmit`,{
            status_type : "Resubmitted",
            status_note : data?.note
          });
          navigate(`/institution/requests/${request.request_id}`)
        }
        
      }
      if(currentStep < 6) setCurrentStep((prev) => prev + 1);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const onError = (
    errors: FieldErrors<
      Institution | BankInformation | PrimaryContact | InstitutionAddress
    >
  ) => {
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

  if(loading){
    return (
      <LoadingPage />
    )
  }

  return (
    <div className="nx-onb-root">
      <div className="nx-onb-page">
        <header className="nx-onb-header">
          <div className="nx-onb-mark">
            <span>✦</span>
          </div>
          <div>
            <div className="nx-onb-brand-name">NEXORA</div>
            <div className="nx-onb-brand-sub">AI-Powered Learning</div>
          </div>
        </header>

        <h1 className="nx-onb-heading">Complete your institution onboarding</h1>

        <div className="nx-stepper">
          {STEPS.map((label, i) => {
            const stepNumber = i + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            return (
              <div
                key={label}
                className={`nx-step${isActive ? " active" : ""}${
                  isCompleted ? " completed" : ""
                }`}
              >
                <div className="nx-step-circle">
                  {isCompleted ? "✓" : stepNumber}
                </div>
                <div className="nx-step-label">{label}</div>
              </div>
            );
          })}
        </div>

        <div className="nx-onb-card">
          {(currentStep === 1 || currentStep === 6) && (
            <>
              <h2>Institution Information</h2>
              <p>Tell us about your educational institution.</p>
              <div className="nx-form">
                <div className="nx-field">
                  <label>Institution Name</label>
                  <input
                    type="text"
                    placeholder="Institution Name"
                    {...register("institution_name", {
                      required: "Institution Name is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Year Established</label>
                  <input
                    type="date"
                    {...register("year_established", {
                      required: "Year Established is required",
                    })}
                  />
                </div>

                <div className="nx-field full">
                  <label>Official Website (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://www.example.edu"
                    {...register("official_website")}
                  />
                </div>

                <div className="nx-field full">
                  <label>Description</label>
                  <textarea
                    placeholder="Tell students about your institution..."
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </div>

                <div className="nx-field full">
                  <label>Institution Logo</label>

                  <div
                    className={`nx-upload ${isLogoDragging ? "dragging" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => logoInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsLogoDragging(true);
                    }}
                    onDragLeave={() => setIsLogoDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsLogoDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      handleFileSelect(file, "institution_logo", setLogoName);
                    }}
                  >
                    <div className="nx-upload-icon">↑</div>

                    <strong>
                      {logoName ? logoName : "Upload institution logo"}
                    </strong>

                    <div className="nx-upload-hint">
                      {logoName
                        ? "Logo selected"
                        : "Drag & drop or click to browse"}
                    </div>

                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        handleFileSelect(file, "institution_logo", setLogoName);
                      }}
                     
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 6 && <hr className="differentiator" />}

          {(currentStep === 2 || currentStep === 6) && (
            <>
              <h2>Contact Information</h2>
              <p>How should we get in touch?</p>
              <div className="nx-form">
                <div className="nx-field">
                  <label>Person Name</label>
                  <input
                    type="text"
                    placeholder="ex :- John Doe"
                    {...register("primary_contact.person_name", {
                      required: "Person Name is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Designation</label>
                  <input
                    type="text"
                    placeholder="ex :- Manager"
                    {...register("primary_contact.designation", {
                      required: "Designation is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Official Email</label>
                  <input
                    type="text"
                    placeholder="ex :- manager@institute.edu.com"
                    {...register("primary_contact.official_mail", {
                      required: "Official Mail of the person is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="ex :- +91XXXXXXXXXX"
                    {...register("primary_contact.phone_number", {
                      required: "Phone Number is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Alternate Phone Number</label>
                  <input
                    type="text"
                    placeholder="ex :- +91XXXXXXXXXX"
                    {...register("primary_contact.alternate_phone_number", {
                      required: "Alternate Phone Number is required",
                    })}
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 6 && <hr className="differentiator" />}

          {(currentStep === 3 || currentStep === 6) && (
            <>
              <h2>Address Information</h2>
              <p>Where are you located at?</p>
              <div className="nx-form">
                <div className="nx-field">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="ex :- India"
                    {...register("address.country", {
                      required: "Country is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="ex :- Kerala"
                    {...register("address.state", {
                      required: "State is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="ex :- Kannur"
                    {...register("address.city", {
                      required: "City is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Postal Code / Pincode</label>
                  <input
                    type="text"
                    placeholder="ex :- 670009"
                    {...register("address.postal_code", {
                      required: "Postal Code / Pincode is required",
                    })}
                  />
                </div>

                <div className="nx-field full">
                  <label>Address</label>
                  <textarea
                    placeholder="ex :- P.O. White House Thamarassery Kozhikode Kerala India"
                    {...register("address.full_address", {
                      required: "Full Address is required",
                    })}
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 6 && <hr className="differentiator" />}

          {(currentStep === 4 || currentStep === 6) && (
            <>
              <h2>Legal Information</h2>
              <p>Enter your formal corporate details</p>
              <div className="nx-form">
                <div className="nx-field">
                  <label>Legal Organization Name</label>
                  <input
                    type="text"
                    placeholder="Legal Organization Name"
                    {...register("legal_information.legal_organization_name", {
                      required: "Legal Organization Name is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Registration Number</label>
                  <input
                    type="text"
                    placeholder="Registration Number"
                    {...register("legal_information.registration_number", {
                      required: "Registration Number is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Registration Authority</label>
                  <input
                    type="text"
                    placeholder="Registration Authority"
                    {...register("legal_information.registration_authority", {
                      required: "Registration Authority is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Tax Identification Number</label>
                  <input
                    type="text"
                    placeholder="Tax Identification Number"
                    {...register(
                      "legal_information.tax_identification_number",
                      {
                        required: "Tax Identification Number is required",
                      }
                    )}
                  />
                </div>

                <div className="nx-field">
                  <label>Accreditation Body</label>
                  <input
                    type="text"
                    placeholder="Accreditation Body"
                    {...register("legal_information.accreditation_body", {
                      required: "Accreditation Body is required",
                    })}
                  />
                </div>

                <div className="nx-field full">
                  <label>Legal Document</label>

                  <div
                    className={`nx-upload ${
                      isDocumentDragging ? "dragging" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => legalDocumentInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDocumentDragging(true);
                    }}
                    onDragLeave={() => setIsDocumentDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDocumentDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      handleFileSelect(
                        file,
                        "legal_information.legal_document",
                        setLegalDocumentName
                      );
                    }}
                  >
                    <div className="nx-upload-icon">↑</div>

                    <strong>
                      {legalDocumentName
                        ? legalDocumentName
                        : "Upload Legal Document"}
                    </strong>

                    <div className="nx-upload-hint">
                      {legalDocumentName
                        ? "Document selected"
                        : "Drag & drop or click to browse"}
                    </div>

                    <input
                      ref={legalDocumentInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,application/pdf,.doc,.docx"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        handleFileSelect(
                          file,
                          "legal_information.legal_document",
                          setLegalDocumentName
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 6 && <hr className="differentiator" />}

          {(currentStep === 5 || currentStep === 6) && (
            <>
              <h2>Bank Information</h2>
              <p>Tell us about your educational institution’s bank details.</p>
              <div className="nx-form">
                <div className="nx-field">
                  <label>Legal Organization Name</label>
                  <input
                    type="text"
                    placeholder="Legal Organization Name"
                    {...register("bank_information.legal_organization_name", {
                      required: "Legal Organization Name is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    {...register("bank_information.bank_name", {
                      required: "Bank Name is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Account Number</label>
                  <input
                    type="text"
                    placeholder="Account Number"
                    {...register("bank_information.account_number", {
                      required: "Account Number is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>Swift Code</label>
                  <input
                    type="text"
                    placeholder="Swift Code"
                    {...register("bank_information.swift_code", {
                      required: "Swift Code is required",
                    })}
                  />
                </div>

                <div className="nx-field">
                  <label>IBAN Number</label>
                  <input
                    type="text"
                    placeholder="IBAN Number"
                    {...register("bank_information.iban_number", {
                      required: "IBAN number is required",
                    })}
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 6 && <hr className="differentiator" />}

          {currentStep === 6 && (
            <div className="nx-field" style={{ marginTop: "10px" }}>
              <label>Note (Optional)</label>
              <textarea
                placeholder="Anything you want to say ?"
                {...register("note")}
              />
            </div>
          )}

          {currentStep === 6 && (
            <>
              <div id="terms">
                <input
                  type="checkbox"
                  {...register("terms_acceptance", {
                    required: "You must accept the terms & privacy policy",
                  })}
                />
                <label htmlFor="terms">
                  By submitting this application, you agree to our Privacy
                  Policy and Terms & Conditions.
                </label>
              </div>

              <div id="consent">
                <input
                  type="checkbox"
                  {...register("educational_consent", {
                    required: "Educational consent is required",
                  })}
                />
                <label htmlFor="consent">
                  We commit to providing high-quality, verified educational
                  programs and resources.
                </label>
              </div>
            </>
          )}

          <div
            className="nx-actions"
            style={{
              justifyContent: currentStep > 1 ? "space-between" : "flex-end",
            }}
          >
            {currentStep > 1 && (
              <button
                type="button"
                className="nx-btn-back"
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                Back
              </button>
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                className="nx-btn-primary"
                onClick={handleSubmit(onSubmit, onError)}
              >
                Save & Continue
              </button>
            ) : (
              <button
                type="button"
                className="nx-btn-primary"
                onClick={handleSubmit(onSubmit, onError)}
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
