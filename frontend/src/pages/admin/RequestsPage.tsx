import { useEffect, useState } from "react";
import type { PlatformRequest } from "../../types/types";
import AdminLayout from "../../components/admin/AdminLayout";
import Modal from "../../components/admin/Modal";
import DetailGrid from "../../components/admin/DetailGrid";
import CommentAlertIcon from '@iconify-react/mdi/comment-alert';
import { useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities } from "../../features/adminSlice";
import LoadingPage from "../Loader/Loading.page";

const INITIAL_REQUESTS: PlatformRequest[] = [
  {
    request_id: "onboarding-dit",
    request_type: "Institution Onboarding Request",
    submitted_by: {
      institution_name : "Dubai Institute of Technology",
      institution_id : "INSTIT-178677383487763FC702C"
    },
    submitted_on: "July 29, 2026",
    status_timeline : [
      {
        status : "Submitted",
        timestamp : new Date(),
        note : null
      }
    ]
  }
];


export default function RequestsPage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchEntities());
  }, []);
  const {requests,loading} = useSelector((state : RootState) => state.admin)
  const [reviewing, setReviewing] = useState<PlatformRequest | null>(null);
  const navigate = useNavigate()

  function resolveRequest(request: PlatformRequest, message: string) {
    // setRequests((prev) => prev.filter((r) => r.request_id !== request.request_id));
    setReviewing(null);
    // showToast(message);
  }
  if(loading){
    return (<LoadingPage />)
  }


  return (
    <AdminLayout title="Requests & Actions">
      <div className="page-header">
        <div>
          <h1>Requests & Actions</h1>
          <p>
            Review institution onboarding, student revocation and platform
            action requests.
          </p>
        </div>
      </div>

      <div className="request-list">
        {requests.map((req) => (
          <div className="request-card" key={req.request_id}>
            <div className="request-left">
              <div className="request-icon"><CommentAlertIcon height="1em" /></div>
              <div>
                <div className="request-title">{req.request_type}</div>
                <div className="request-description">{""}</div>
              </div>
            </div>

            <div className="request-actions">
              <button
                className="btn btn-outline btn-small"
                onClick={() => setReviewing(req)}
              >
                Review
              </button>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <p style={{ color: "var(--muted)", fontSize: 12 }}>
            No pending requests right now.
          </p>
        )}
      </div>

      <Modal
        isOpen={reviewing !== null}
        onClose={() => setReviewing(null)}
        title={reviewing?.request_type ?? "Review Request"}
        subtitle="Review the request details before taking action."
        footer={
          reviewing?.request_type === "Institution Onboarding Request" ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setReviewing(null)}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/admin/institutions/${reviewing.submitted_by.institution_id}`)}
              >
                View Institution
              </button>

            </>
          ) : (
            <button
                className="btn btn-secondary"
                onClick={() => setReviewing(null)}
              >
                Close
              </button>
          )
        }
      >
        {reviewing && (
          <>
            <DetailGrid
              items={[
                { label: "Request Type", value: reviewing.request_type },
                { label: "Institution Name", value: reviewing.submitted_by.institution_name },
                { label: "Submitted Date", value: new Date(reviewing.submitted_on).toLocaleDateString("en-US",{year : "numeric",month : "long",day : "2-digit"}) },
                { label: "Current Status", value: reviewing.status_timeline[reviewing.status_timeline.length - 1].status },
              ]}
            />
          </>
        )}
      </Modal>
    </AdminLayout>
  );
}
