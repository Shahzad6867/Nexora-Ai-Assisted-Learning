import { useState } from "react";
import "../../styles/auth/Auth.css";
import { GoogleIcon } from "../../components/auth/GoogleIcon";
import EyeOutlineIcon from "@iconify-react/mdi/eye-outline";
import EyeOffOutlineIcon from "@iconify-react/mdi/eye-off-outline";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm,  type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import api from "../../api/auth";
import { useDispatch } from "react-redux";
import {startVerification} from "../../features/authSlice"

interface MyFormInputs {
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth : Date;
  email : string;
  password: string;
  confirm_password : string,
  role : string
}

export default function RegisterPage() {
  const { register, handleSubmit,watch } = useForm <MyFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  const path = location.pathname.split("/");
  const role = path[1];
  const passwordValue = watch("password")
  let ageValue = watch("age")
  const onSubmit = async (data : MyFormInputs) => {
    try {
      delete data.confirm_password;
      data.role = role
      const response = await api.post(`/otp/register`,data)
      console.log(response)
      dispatch(startVerification(response.data))
      navigate("/auth/verify/otp")
      toast.info(response.data.message)
    } catch (error) {
      toast.error(error?.response.data.message)
    }
  }
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

          <div className="nx-brand">
            <div className="nx-brand-mark">
              <span>✦</span>
            </div>
            <div>
              <div className="nx-brand-name">NEXORA</div>
              <div className="nx-brand-sub">AI-Assisted Learning</div>
            </div>
          </div>

          <div className="nx-content">
            <section className="nx-welcome">
              <h1>
                {role === "student" ? "Start your" : "Empower your"}
                <br />
                {role === "student" ? "learning adventure" : "institution"}
              </h1>
              <p>
                {role === "student"
                  ? "Create an account and let Nexora's AI tailor every lesson to how you learn best."
                  : "Build meaningful learning experiences, manage your academic ecosystem and empower students with intelligent learning"}
              </p>

              {role === "student" && (
                <div className="nx-portal-art">
                  <div className="nx-portal" />
                  <div className="nx-platform" />
                  <div className="nx-float one">◆</div>
                  <div className="nx-float two">✦</div>
                  <div className="nx-float three">▥</div>
                </div>
              )}
            </section>

            <section
              className="nx-card"
              style={role === "institution" ? { height: "545px" } : {}}
            >
              <h2>
                {role === "student"
                  ? "Create your account"
                  : "Create your institution account"}
              </h2>
              <p className="nx-intro">
                {role === "student"
                  ? "Join Nexora and start learning smarter today"
                  : "Create your account using your official institution email address."}
              </p>

              {role === "student" && (
                <Link to={"http://localhost:5000/api/auth/google"} className="nx-social">
                  <GoogleIcon />
                  Continue with Google
                </Link>
              )}
              {role === "student" && (
                <div className="nx-divider">or continue with</div>
              )}

              <form onSubmit={handleSubmit(onSubmit,onError)}>
                {role === "student" && (
                  <div className="nx-row">
                    <div>
                      <label htmlFor="firstName">First Name</label>
                      <input
                        id="firstName"
                        placeholder="Enter your first name"
                        {...register("first_name", {
                          required: "First Name is required",
                          maxLength: {
                            value: 40,
                            message: "Invalid first name",
                          },
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        id="lastName"
                        placeholder="Enter your last name"
                        {...register("last_name", {
                          required: "Last Name is required",
                          maxLength: {
                            value: 40,
                            message: "Invalid last name",
                          },
                        })}
                      />
                    </div>
                  </div>
                )}
                {role === "student" && (
                  <div className="nx-row">
                    <div>
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        placeholder="Date of Birth"
                        {...register("date_of_birth", {
                          required: "Date of Birth is required",
                          validate: (value) => {
                            if(isNaN(ageValue)) return "Age is required"
                            const today = new Date();
                            const birthDate = new Date(value);

                            let age =
                              today.getFullYear() - birthDate.getFullYear();
                            const monthDiff =
                              today.getMonth() - birthDate.getMonth();

                            if (
                              monthDiff < 0 ||
                              (monthDiff === 0 &&
                                today.getDate() < birthDate.getDate())
                            ) {
                              age--;
                            }
                            if(age < 13) return "You must be at least 13 years old to register"
                            else if(age !== ageValue) return "Age does not match Date of Birth" 
                          },
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="age">Age</label>
                      <input
                        id="age"
                        type="number"
                        onWheel={(e) => e.currentTarget.blur()}
                        min={13}
                        placeholder="Enter your age"
                        {...register("age", {
                          required: "Age is required",
                          valueAsNumber: true,
                          min: {
                            value: 13,
                            message:
                              "You must be at least 13 years old to register",
                          },
                        })}
                      />
                    </div>
                  </div>
                )}
                <div className="nx-field">
                  <label htmlFor="email">
                    {role === "institution" && "Institution "}Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <div className="nx-field">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password must include uppercase, lowercase, a number, and a special character.",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="nx-eye"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      data-tooltip={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <EyeOutlineIcon height="1em" />
                      ) : (
                        <EyeOffOutlineIcon height="1em" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="nx-field">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...register("confirm_password",{
                        required : "Confirm Password is required",
                        validate : (value) =>
                        value === passwordValue ||
                        "Passwords do not match"
                    })}
                    />
                    <button
                      type="button"
                      className="nx-eye"
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                      data-tooltip={
                        showConfirm ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowConfirm((v) => !v)}
                    >
                      {showConfirm ? (
                        <EyeOutlineIcon height="1em" />
                      ) : (
                        <EyeOffOutlineIcon height="1em" />
                      )}
                    </button>
                  </div>
                </div>

                <button className="nx-primary" type="submit">
                  <span style={{ fontWeight: "700" }}>Continue</span>
                </button>
              </form>

              <div className="nx-switch">
                Already have an account?{" "}
                <Link to={`/${role}/login`}>Log in</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
