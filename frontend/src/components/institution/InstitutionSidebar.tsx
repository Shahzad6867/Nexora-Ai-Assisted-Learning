// Only "Instructors" is wired up since that's the only page in this
// delivery — add more items here (Dashboard, Courses, Students, Profile...)

import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../../pages/auth/Login.page";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Dashboard2FillIcon from '@iconify-react/mage/dashboard-2-fill';
import TeachIcon from '@iconify-react/mdi/teach';
import LogoutCircle02Icon from '@iconify-react/hugeicons/logout-circle-02';
import BookFillIcon from '@iconify-react/mage/book-fill';
import type { AppDispatch, RootState } from "../../app/store";
import { logoutEntity } from "../../features/authSlice";

// as those pages get built, following the same nav-item pattern.
export default function InstitutionSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const {token} = useSelector((state : RootState) => state.auth)
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
          <div className="brand-sub">INSTITUTION PORTAL</div>
        </div>
      </div>

      <div className="nav-title">PLATFORM</div>
      <NavLink to="/institution/dashboard" className="nav-item ">
        <div className="nav-icon"><Dashboard2FillIcon /></div>
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/institution/courses" className="nav-item ">
        <div className="nav-icon"><BookFillIcon /></div>
        <span>Courses</span>
      </NavLink>
      <NavLink to="/institution/instructors" className="nav-item ">
        <div className="nav-icon"><TeachIcon /></div>
        <span>Instructors</span>
      </NavLink>
      <div className="nav-item" onClick={logout}>
        <div className="nav-icon"><LogoutCircle02Icon /></div>
        <span>Logout</span>
      </div>
    </aside>
  );
}
