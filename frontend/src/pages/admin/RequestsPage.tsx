import { useEffect, useState } from "react";
import type { PlatformRequest } from "../../types/types";
import AdminLayout from "../../components/admin/AdminLayout";
import Modal from "../../components/admin/Modal";
import DetailGrid from "../../components/admin/DetailGrid";
import CommentAlertIcon from "@iconify-react/mdi/comment-alert";
import { useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities } from "../../features/adminSlice";
import LoadingPage from "../Loader/Loading.page";
import { AdminToolbar } from "../../components/admin/AdminToolbar";
import Pagination from "../../components/admin/Pagination";
import { formatDate } from "../../utilities/formatDateAndTime.utility";

const STATUS_FILTERS = [
  { label: "All Requests", value: "all" },
  { label: "Submitted", value: "Submitted" },
  { label: "In Progress", value: "In Progress" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
];

export default function RequestsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("newest");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [requestType, setRequestType] = useState("All Requests");
  useEffect(() => {
    dispatch(
      fetchEntities({
        page,
        itemsPerPage,
        searchByEntity: {
          search,
          entity: "requests",
        },
      })
    );
  }, [page, itemsPerPage, search]);
  const { requests, loading } = useSelector((state: RootState) => state.admin);
  const [reviewing, setReviewing] = useState<PlatformRequest | null>(null);
  const navigate = useNavigate();

  if (loading) {
    return <LoadingPage />;
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

      <AdminToolbar
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Type request id / submitted institution id . . ."
        currentStatusFilter={statusFilter}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setPage={setPage}
        setStatusFilter={setStatusFilter}
        status_filters={STATUS_FILTERS}
        filterByRequestType={true}
        requestType={requestType}
        setRequestType={setRequestType}
        sortByRequired={false}
      />

      <div className="request-list">
        {requests.documents.map((req) => (
          <div className="request-card" key={req.request_id}>
            <div className="request-left">
              <div className="request-icon">
                <CommentAlertIcon height="1em" />
              </div>
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

        {requests.documents.length === 0 && (
          <div className="request-card" >
              No requests found
          </div>
        )}
      </div>

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={requests.totalPages}
      />

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
                onClick={() =>
                  navigate(
                    `/admin/institutions/${reviewing.submitted_by.institution_id}`
                  )
                }
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
                {
                  label: "Institution Name",
                  value: reviewing.submitted_by.institution_name,
                },
                {
                  label: "Submitted Date",
                  value: formatDate(reviewing.submitted_on),
                },
                {
                  label: "Current Status",
                  value:
                    reviewing.status_timeline[
                      reviewing.status_timeline.length - 1
                    ].status,
                },
              ]}
            />
          </>
        )}
      </Modal>
    </AdminLayout>
  );
}
