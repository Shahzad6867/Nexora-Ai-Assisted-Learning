import { useNavigate, useSearchParams } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import "../styles/LandingPage.css"
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useEffect, useState } from "react";
import LoadingPage from "./Loader/Loading.page";

type Role = "student" | "institution" | "instructor";

interface Course {
  id: string;
  category: string;
  icon: string;
  coverClass: string;
  title: string;
  description: string;
  institutionInitials: string;
  institutionName: string;
  price: string;
}

const COURSES: Course[] = [
  {
    id: "fullstack",
    category: "Technology",
    icon: "</>",
    coverClass: "nx-cover-c1",
    title: "Full Stack Development",
    description: "Learn frontend, backend, databases, APIs and deployment through structured modules.",
    institutionInitials: "NU",
    institutionName: "Nexora University",
    price: "$1,200",
  },
  {
    id: "data-ai",
    category: "Data Science",
    icon: "AI",
    coverClass: "nx-cover-c2",
    title: "Data Science & AI",
    description: "Explore data analysis, machine learning and artificial intelligence fundamentals.",
    institutionInitials: "TI",
    institutionName: "Tech Institute",
    price: "$950",
  },
  {
    id: "business-analytics",
    category: "Business",
    icon: "BA",
    coverClass: "nx-cover-c3",
    title: "Business Analytics",
    description: "Develop practical skills to understand business data and make better decisions.",
    institutionInitials: "GB",
    institutionName: "Global Business School",
    price: "$780",
  },
];

interface LandingPageProps {
  onLogin?: (role: Role) => void;
  onRegister?: (role: Role) => void;
  onViewCourse?: (courseId: string) => void;
}

export default function LandingPage({onViewCourse }: LandingPageProps) {
  const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
  function scrollToCourses() {
    document.getElementById("nx-public-courses")?.scrollIntoView({ behavior: "smooth" });
  }
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const token = searchParams.get("token")
    if(token){
      localStorage.setItem("token",token)
      navigate("/",{replace : true})
      setLoading(false)
    }else{
      setLoading(false)
    }
  },[searchParams,navigate])

  if(loading){
    return (
      <LoadingPage />
    )
  }
  return (
    <>
      

      <div className="nx-landing-root">
        <Navbar />

        <section className="nx-hero">
          <div>
            <span className="nx-badge">A smarter way to learn</span>
            <h1>
              Learn. Progress.
              <br />
              <span>Prove your skills.</span>
            </h1>
            <p>
              Discover structured courses from trusted institutions, learn module by module, access video and PDF
              resources, complete assignments, take chapter tests, and build your academic journey with Nexora.
            </p>
            <div className="nx-hero-actions">
              <button className="nx-btn nx-landing-btn-primary" onClick={scrollToCourses}>
                Explore Courses →
              </button>
              <button className="nx-btn nx-btn-outline" onClick={() => navigate("/student/register")}>
                Create Student Account
              </button>
            </div>
          </div>

          {/* <div className="nx-hero-visual">
            <div className="nx-visual-card nx-v1">
              <small>YOUR LEARNING JOURNEY</small>
              <strong>Full Stack Development</strong>
              <div className="nx-visual-bar">
                <span />
              </div>
              <small className="nx-visual-caption">Module 1 of 3 · 58% complete</small>
            </div>
            <div className="nx-visual-card nx-v2">
              <small>CHAPTER TEST</small>
              <strong>86%</strong>
            </div>
            <div className="nx-visual-card nx-v3">
              <small>RESOURCES</small>
              <strong>24</strong>
            </div>
          </div> */}
        </section>

        <section className="nx-section" id="nx-public-courses">
          <div className="nx-section-title">
            <h2>Explore Courses</h2>
            <p>Choose a course from institutions and start your learning journey.</p>
          </div>

          <div className="nx-course-grid">
            {COURSES.map((course) => (
              <div className="nx-course-card" key={course.id}>
                <div className={`nx-cover ${course.coverClass}`}>
                  <span className="nx-cover-tag">{course.category}</span>
                  <div className="nx-cover-icon">{course.icon}</div>
                </div>
                <div className="nx-course-body">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="nx-institution">
                    <div className="nx-inst-logo">{course.institutionInitials}</div>
                    <div>
                      <span>Offered by</span>
                      <strong>{course.institutionName}</strong>
                    </div>
                  </div>
                  <div className="nx-course-footer">
                    <div className="nx-price">
                      {course.price} <small>total</small>
                    </div>
                    <button className="nx-btn nx-landing-btn-primary nx-btn-small" onClick={() => onViewCourse?.(course.id)}>
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}