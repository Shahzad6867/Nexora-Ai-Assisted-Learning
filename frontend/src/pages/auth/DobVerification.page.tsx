import "../../styles/auth/OtpVerification.css";
import { toast } from "sonner";
import api from "../../api/auth";
import { useNavigate, useParams } from "react-router";
import { useForm, type FieldErrors } from "react-hook-form";
import { useEffect, useState } from "react";

interface MyFormInputs {
  age: number;
  date_of_birth: Date;
}

export default function DobVerificationPage() {
  const params = useParams()
  const { register, handleSubmit, watch} = useForm<MyFormInputs>();
  const TOTAL_TIME = 600; // 10 minutes in seconds
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
  const navigate = useNavigate();

  const ageValue = watch("age");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/student/register"); 
          toast.error("Registration session expired. Please register again via Google.");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Helper function to format seconds into MM:SS string
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: MyFormInputs) => {
    try {
      
      const response = await api.post(`/dob/verify/${params.id}`, data);
      console.log(response.data);
      navigate("/");
      toast.success("Welcome to Nexora 👋");
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    }
  };
  const onError = (errors : FieldErrors<MyFormInputs>) => {
    const errorValues = Object.values(errors);
    if (errorValues.length > 0) {
      const firstError = errorValues[0];
      
      // 3. Optional optional chaining safety check (?.)
      if (firstError?.message) {
        toast.error(firstError.message);
      }
    }
  }

  return (
    <>
      <div className="nx-root">
        <div className="nx-page">
          <div className="nx-stars" />

          {/* Brand Header */}
          <div className="nx-brand">
            <div className="nx-brand-mark">
              <span>✦</span>
            </div>
            <div>
              <div className="nx-brand-name">NEXORA</div>
              <div className="nx-brand-sub">AI-Assisted Learning</div>
            </div>
          </div>

          {/* Main Card Content */}
          <div className="nx-content-otp">
            <section className="nx-card-otp" style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Top Anti-Refresh Alert Capsule */}
              <div
                style={{
                  backgroundColor: "rgba(163, 76, 255, 0.08)",
                  border: "1px solid rgba(163, 76, 255, 0.25)",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  marginBottom: "24px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#a34cff",
                    lineHeight: "1.4",
                  }}
                >
                  <span>Please do not refresh</span> or go back from this page
                </p>
              </div>

              {/* Title Section */}
              <h1 style={{ margin: "0 0 2px 0", fontSize: "24px", fontWeight: "700", color: "#00023b", }}>
                Complete Your Profile
              </h1>
              <p className="nx-intro" style={{ textAlign: "start", marginBottom: "20px", marginTop: "0" , fontSize : "12px" , color : "#4b4b52"}}>
                Enter your date of birth and age to finish registration
              </p>

              {/* Form Element */}
              <form onSubmit={handleSubmit(onSubmit,onError)}>
                <div className="nx-row">
                  <div>
                    <label htmlFor="dateOfBirth" style={{paddingLeft : "6px"}}>Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      placeholder="Date of Birth"
                      style={{ marginTop : "6px"}}
                      {...register("date_of_birth", {
                        required: "Date of Birth is required",
                        validate: (value) => {
                          if (isNaN(Number(ageValue))) return "Age is required";
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
                          if (age < 13) return "You must be at least 13 years old to register";
                          if (age !== ageValue) return "Age does not match Date of Birth";
                        },
                      })}
                    />
                  </div>

                  <div>
                    <label htmlFor="age" style={{paddingLeft : "6px"}}>Age</label>
                    <input
                      id="age"
                      type="number"
                      onWheel={(e) => e.currentTarget.blur()}
                      min={0}
                      placeholder="Enter your age"
                      style={{ marginTop : "6px"}}
                      {...register("age", {
                        required: "Age is required",
                        valueAsNumber: true,
                        min: {
                          value: 13,
                          message: "You must be at least 13 years old to register",
                        },
                      })}
                    />
                  </div>
                </div>

                {/* Primary Button */}
                <button
                  className="nx-primary"
                  type="submit"
                  style={{ marginTop: "16px", cursor: "pointer" }}
                >
                  <span style={{ fontWeight: "700" }}>
                    Verify &amp; Continue
                  </span>
                </button>
              </form>

              {/* Polished Bottom Timer Component */}
              <div style={{ textAlign: "center", marginTop: "28px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                  <button
                    type="button"
                    disabled
                    style={{ 
                      cursor: "not-allowed",
                      fontSize: "15px",
                      color : "#565259"
                    }}
                  >
                    Registration expires in
                  </button>{" "}
                  <span style={{ fontWeight: "600", color: "#a34cff", fontSize: "15px", letterSpacing: "0.5px" }}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                
                {/* Secondary Helpful Footnote */}
                <p className="nx-footer">
                  Once the countdown hits zero, your verification state will be dropped.<br />
                  You will need to re-authenticate through Google to try again.
                </p>
              </div>

            </section>
          </div>
        </div>
      </div>
    </>
  );
}
