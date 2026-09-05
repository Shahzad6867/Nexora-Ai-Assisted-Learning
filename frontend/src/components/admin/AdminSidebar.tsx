import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate } from "react-router";
import type { CustomJwtPayload } from "../../pages/auth/Login.page";
import Dashboard2FillIcon from '@iconify-react/mage/dashboard-2-fill';
import TeachIcon from '@iconify-react/mdi/teach';
import AccountStudentIcon from '@iconify-react/mdi/account-student';
import Castle2FilledIcon from '@iconify-react/tdesign/castle-2-filled';
import ChecklistNoteFillIcon from '@iconify-react/mage/checklist-note-fill';
import LogoutCircle02Icon from '@iconify-react/hugeicons/logout-circle-02';
import { type AppDispatch, type RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutEntity } from "../../features/authSlice";
// Add more entries here later (Dashboard, Revenue & Analytics, Profile, etc.)
// — the layout and styling already support any number of items.
const NAV_ITEMS = [
  { to: "/admin/dashboard", icon: (<Dashboard2FillIcon />), label: "Dashboard" },
  { to: "/admin/institutions", icon: (<Castle2FilledIcon />), label: "Institutions" },
  { to: "/admin/students", icon: (<AccountStudentIcon />), label: "Students" },
  { to: "/admin/instructors", icon: (<TeachIcon />), label: "Instructors" },
  { to: "/admin/requests", icon: (<ChecklistNoteFillIcon />), label: "Requests & Actions" },

];

export default function AdminSidebar() {
  const {token} = useSelector((state : RootState) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  function logout() {
    if (token) {
      const entity = jwtDecode(token) as CustomJwtPayload;
      dispatch(logoutEntity())
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
        <div className="nav-icon"><LogoutCircle02Icon /></div>

        Logout</button>
    </aside>
  );
}
