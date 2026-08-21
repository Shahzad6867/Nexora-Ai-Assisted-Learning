import { useState } from "react";
import { useNavigate } from "react-router";
import type { RolePopoverProps } from "./types";
import TeachIcon from '@iconify-react/mdi/teach';
import AccountStudentIcon from '@iconify-react/mdi/account-student';
import Castle2FilledIcon from '@iconify-react/tdesign/castle-2-filled';
  
  export function RolePopover({ triggerLabel, triggerClassName,options }: RolePopoverProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const dest = (triggerLabel === "Log in" ? "login" : "register")
    return (
      <div className="nx-popover-root" >
        <button
          type="button"
          className={triggerClassName}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {triggerLabel}
          <span className={`nx-caret ${open ? "nx-caret-open" : ""}`}>⌄</span>
        </button>
  
        {open && (
          <div className={`nx-popover-panel nx-align-right`} role="menu">
            {options.map((opt) => (
              <button
                key={opt.role}
                type="button"
                role="menuitem"
                className="nx-role-card"
                onClick={() => navigate(`/${opt.role}/${dest}`)}
              >
                <span className="nx-role-icon">{opt.role === "instructor" ? (<TeachIcon height="1.5em" color="#635bff"/>) : opt.role === "student" ? (<AccountStudentIcon  height="1.5em" color="#635bff"/>) : (<Castle2FilledIcon height="1.5em" color="#635bff"/>) }</span>
                <span className="nx-role-text">
                  <span className="nx-role-label">{opt.label}</span>
                  <span className="nx-role-desc">{opt.description}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }