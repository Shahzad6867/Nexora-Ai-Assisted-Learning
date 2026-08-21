import { useState } from "react";
import "../../styles/auth/Auth.css";
import { GoogleIcon } from "../../components/auth/GoogleIcon";
import { Link, useLocation, useNavigate } from "react-router";
import EyeOffOutlineIcon from "@iconify-react/mdi/eye-off-outline";
import EyeOutlineIcon from "@iconify-react/mdi/eye-outline";
import api from "../../api/auth";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useForm, type FieldErrors } from "react-hook-form";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { fetchEntities } from "../../features/institutionSlice";
import type { AppDispatch } from "../../app/store";

interface LoginFormInputs {
  email: string;
  password: string;
  role?: string;
}

export interface CustomJwtPayload extends JwtPayload {
  _id : string,
  role : string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {register,handleSubmit} = useForm<LoginFormInputs>()
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const path = location.pathname.split("/");
  const role = path[1];
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      data.role = role;
      const response = await api.post(`/login`, data);
      localStorage.setItem("token",response.data.token)
      if(role === "institution"){
        const institution = jwtDecode(response.data.token) as CustomJwtPayload
        dispatch(fetchEntities(institution._id as string))
      }
      role === "student" ? navigate("/") : navigate(`/${role}/dashboard`)
      toast.info(response.data.message);
    } catch (error) {

      toast.error(error?.response.data.message);
    }
  };
  const onError = (errors: FieldErrors<LoginFormInputs>) => {
    const errorValues = Object.values(errors);
    if (errorValues.length > 0) {
      const firstError = errorValues[0];

      // 3. Optional optional chaining safety check (?.)
      if (firstError?.message) {
        toast.error(firstError.message);
      }
    }
  };
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
              <h1>Welcome Back</h1>
              <p>
                {role === "student"
                  ? "Continue your learning journey with AI assistance"
                  : role === "institution"
                  ? "Build meaningful learning experiences, manage your academic ecosystem and empower students with intelligent learning"
                  : "Manage your courses, guide students, review assignments and help learners achieve more."}
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
              style={
                role === "institution"
                  ? { height: "450px", marginTop: "70px" }
                  : role === "instructor"
                  ? { height: "430px", marginTop: "70px" }
                  : { height: "550px", marginTop: "50px" }
              }
            >
              <h2>
                {role === "student"
                  ? "Login to your account"
                  : role === "institution"
                  ? "Institution Login"
                  : "Instructor Login"}
              </h2>
              <p className="nx-intro">
                {role === "student"
                  ? "Enter your credentials to access your account"
                  : role === "institution"
                  ? "Access your institution's academic management dashboard"
                  : "Sign in using the credentials provided by your institution."}
              </p>

              {role === "student" && (
                <Link to="http://localhost:5000/api/auth/google"  className="nx-social" type="button">
                  <GoogleIcon />
                  Continue with Google
                </Link>
              )}

              {role === "student" && (
                <div className="nx-divider">or continue with</div>
              )}

              <form onSubmit={handleSubmit(onSubmit,onError)}>
                <div className="nx-field">
                  <label htmlFor="email">Email</label>
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
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long, must include uppercase, lowercase, a number, and a special character",
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

                <button className="nx-primary" type="submit">
                  <span style={{ fontWeight: "700" }}>Log in</span>
                </button>
              </form>

              {role !== "instructor" && (
                <div className="nx-switch">
                  Don't have an account?{" "}
                  <Link to={`/${role}/register`}>Register</Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
