import { useDispatch, useSelector } from "react-redux";
import "../../styles/RequestStatus.css";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchRequest } from "../../features/requestSlice";
import { useNavigate, useParams } from "react-router";
import LoadingPage from "../Loader/Loading.page";

/* =========================================================
   TYPES
========================================================= */

export type RequestStatus =
  | "Submitted"
  | "In Progress"
  | "Approved"
  | "Rejected"
  | "Resubmitted"

export interface StatusTimelineEntry {
  status: string;
  timestamp: string;
  note: string | null;
}

export const STEP_LABELS: Record<string, string> = {
  submitted: "Submitted",
  in_progress: "In Progress",
  approved: "Approved",
  rejected: "Rejected",
};

export default function RequestStatusPage({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchRequest(params.id));
  }, []);
  const { request,loading } = useSelector((state: RootState) => state.request);
  const params = useParams();
  const timeline = request?.status_timeline ?? [];
  const status = timeline[timeline?.length - 1]?.status ?? "Submitted";
  const meta = STATUS_META[status];

  const onBackToOnboarding = () => {
    navigate(`/institution/onboarding/${request.submitted_by}`);
  };
  const onGoToDashboard = () => {
    navigate("/institution/instructors");
  };

  if(loading){
    return (<LoadingPage />)
  }else return (
    <>
      <div className="nx-status-root">
        <div className="nx-status-page">
          <header className="nx-status-header">
            <div className="nx-status-mark">
              <span>✦</span>
            </div>
            <div>
              <div className="nx-status-brand-name">NEXORA</div>
              <div className="nx-status-brand-sub">AI-Powered Learning</div>
            </div>
          </header>

          <div className="nx-app-row">
            <div className="nx-app-id">
              <small>Request ID</small>
              {request?.request_id ?? "Not Available"}
            </div>
          </div>

          <div className="nx-status-card">
            <div
              className="nx-status-icon"
              style={{ background: meta.iconBg, color: meta.iconColor }}
            >
              {meta.icon}
            </div>
            <h2>{meta.title}</h2>
            <p>{meta.description}</p>

            {status === "Rejected" && (
              <div className="nx-reason-box">
                <strong>Reason for rejection</strong>
                <p>{timeline[timeline.length - 1].note}</p>
              </div>
            )}

            {status === "Approved" && (
              <div className="nx-status-cta">
                <button className="nx-back-link" onClick={onGoToDashboard}>
                  Go to Institution Dashboard →
                </button>
              </div>
            )}

            {status === "Rejected" && (
              <button className="nx-back-link" onClick={onBackToOnboarding}>
                ← Back to onboarding
              </button>
            )}
          </div>

          {timeline.length > 0 && (
            <div className="nx-log">
              <h3>Application Timeline</h3>
              {timeline.map((entry, i) => (
                <div className="nx-log-item" key={i}>
                  <div className="nx-log-dot" />
                  <div className="nx-log-body">
                    <strong>{STEP_LABELS[entry.status] ?? entry.status}</strong>
                    <span>
                      {new Date(entry.timestamp).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      ·{" "}
                      {new Date(entry.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                    </span>
                    {entry.note && <p>{entry.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const STATUS_META: Record<
  RequestStatus,
  {
    title: string;
    description: string;
    icon: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  Submitted: {
    title: "Application Submitted",
    description:
      "Your institution onboarding application has been received. Our team will begin reviewing it shortly.",
    icon: "📨",
    iconBg: "#f0f0ff",
    iconColor: "#5b48ff",
  },
  "In Progress": {
    title: "Application In Review",
    description:
      "Our administration team is currently reviewing your institution details. This usually takes 2–3 business days.",
    icon: "⏳",
    iconBg: "#f0f0ff",
    iconColor: "#5b48ff",
  },
  Approved: {
    title: "Application Approved",
    description:
      "Congratulations! Your institution has been successfully verified and approved. You can now access your institution dashboard.",
    icon: "✓",
    iconBg: "#e9faf2",
    iconColor: "#1d9d68",
  },
  Rejected: {
    title: "Changes Requested",
    description:
      "Our administration team reviewed your application and requested additional information. Please review the reason below and resubmit.",
    icon: "!",
    iconBg: "#fff0f1",
    iconColor: "#df5361",
  },
  Resubmitted : {
    title: "Application Resubmitted",
    description:
    "Your institution onboarding application has been received. Our team will begin reviewing it shortly.",
    icon: "📨",
    iconBg: "#f0f0ff",
    iconColor: "#5b48ff",
  }
  
};
