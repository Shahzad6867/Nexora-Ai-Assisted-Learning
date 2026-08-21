import { useState } from "react";
import { RolePopover } from "./RolePopover";
import { LOGIN_ROLES, REGISTER_ROLES } from "./types";
import "../../styles/Navbar.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../../pages/auth/Login.page";
import { useNavigate } from "react-router";

export default function NexoraNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <>
      <div className="nx-nav-root">
        <nav className="nx-nav">
          <div className="nx-brand">
            <div className="nx-brand-mark">✦</div>
            <div>
              <div className="nx-nav-brand-name">NEXORA</div>
              <div className="nx-nav-brand-sub">AI-ASSISTED LEARNING</div>
            </div>
          </div>
          {!token && (
            <>
              <div className="nx-nav-actions nx-desktop-actions">
                <RolePopover
                  triggerLabel="Log in"
                  triggerClassName="nx-btn nx-btn-outline"
                  options={LOGIN_ROLES}
                />
                <RolePopover
                  triggerLabel="Get Started"
                  triggerClassName="nx-btn nx-nav-btn-primary"
                  options={REGISTER_ROLES}
                />
              </div>

              <button
                type="button"
                className="nx-mobile-toggle"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? "✕" : "☰"}
              </button>
            </>
          )}

          {token && (
            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          )}

          {!token && mobileOpen && (
            <div className="nx-mobile-panel">
              <div>
                <div className="nx-mobile-group-label">Log in</div>
                {LOGIN_ROLES.map((opt) => (
                  <button key={opt.role} type="button" className="nx-role-card">
                    <span className="nx-role-icon">{opt.icon}</span>
                    <span className="nx-role-text">
                      <span className="nx-role-label">{opt.label}</span>
                      <span className="nx-role-desc">{opt.description}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div>
                <div className="nx-mobile-group-label">Get started</div>
                {REGISTER_ROLES.map((opt) => (
                  <button key={opt.role} type="button" className="nx-role-card">
                    <span className="nx-role-icon">{opt.icon}</span>
                    <span className="nx-role-text">
                      <span className="nx-role-label">{opt.label}</span>
                      <span className="nx-role-desc">{opt.description}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
