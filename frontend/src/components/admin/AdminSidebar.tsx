import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate } from "react-router";
import type { CustomJwtPayload } from "../../pages/auth/Login.page";

// Add more entries here later (Dashboard, Revenue & Analytics, Profile, etc.)
// — the layout and styling already support any number of items.
const NAV_ITEMS = [
  { to: "/admin/dashboard", icon: "◈", label: "Dashboard" },
  { to: "/admin/institutions", icon: "◈", label: "Institutions" },
  { to: "/admin/students", icon: "♙", label: "Students" },
  { to: "/admin/instructors", icon: "◎", label: "Instructors" },
  { to: "/admin/requests", icon: "◌", label: "Requests & Actions" },

];

export default function AdminSidebar() {
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
          <div className="brand-sub">PLATFORM ADMIN</div>
        </div>
      </div>

      <div className="nav-title">Platform</div>

      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
        >
          <div className="nav-icon">{item.icon}</div>
          <span>{item.label}</span>
        </NavLink>
      ))}

      <button
      className="nav-item"
      onClick={logout}
      >
        <div className="nav-icon">◎</div>

        Logout</button>
    </aside>
  );
}
