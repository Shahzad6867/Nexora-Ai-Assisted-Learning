// Only "Instructors" is wired up since that's the only page in this
// delivery — add more items here (Dashboard, Courses, Students, Profile...)

import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../../pages/auth/Login.page";
import { NavLink, useNavigate } from "react-router";

// as those pages get built, following the same nav-item pattern.
export default function InstitutionSidebar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function logout() {
    if (token) {
      const entity = jwtDecode(token) as CustomJwtPayload;
      localStorage.removeItem("token");
      navigate(`/${entity.role}/login`);
    }
  }
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">✦</div>
        <div>
          <div className="brand-name">NEXORA</div>
          <div className="brand-sub">INSTITUTION PORTAL</div>
        </div>
      </div>

      <div className="nav-title">PLATFORM</div>
      <NavLink to="/institution/dashboard" className="nav-item ">
        <div className="nav-icon">◎</div>
        <span>Dashbaord</span>
      </NavLink>
      <NavLink to="/institution/instructors" className="nav-item ">
        <div className="nav-icon">◎</div>
        <span>Instructors</span>
      </NavLink>
      <div className="nav-item" onClick={logout}>
        <div className="nav-icon">◎</div>
        <span>Logout</span>
      </div>
    </aside>
  );
}
