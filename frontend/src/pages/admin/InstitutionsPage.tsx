import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import Modal from "../../components/admin/Modal";
import DetailGrid from "../../components/admin/DetailGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities } from "../../features/adminSlice";
import type { AppDispatch, RootState } from "../../app/store";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import api from "../../api/api";
import Pagination from "../../components/admin/Pagination";
import { AdminToolbar } from "../../components/admin/AdminToolbar";
import { formatDate } from "../../utilities/formatDateAndTime.utility";

const STATUS_FILTERS = [
  { label: "All Institutions", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

export default function InstitutionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewing, setViewing] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      fetchEntities({
        page,
        itemsPerPage,
        sortBy,
        searchByEntity: {
          search,
          entity: "institutions",
        },
      })
    );
  }, [page, itemsPerPage, sortBy, search]);

  const { institutions } = useSelector((state: RootState) => state.admin);
  const navigate = useNavigate();

  async function updateInstitutionIsBlocked(
    institution_id: string,
    isBlocking: boolean
  ) {
    const actionText = isBlocking ? "block" : "unblock";

    toast(`Are you sure you want to ${actionText} this institution ?`, {
      duration: Infinity,
      classNames: {
        actionButton:
          "!bg-white !text-[#6650ff] hover:!bg-gray-200 !font-semibold",
        cancelButton:
          "!bg-white !text-[#6650ff] hover:!bg-gray-200 !font-semibold",
      },
      action: {
        label: "Confirm",
        onClick: () => {
          const updatePromise = api.put(`/admin/update/is-blocked`, {
            _id: institution_id,
            role: "institution",
          });

          toast.promise(updatePromise, {
            loading: `${isBlocking ? "Blocking" : "Unblocking"} institution...`,
            success: (response) => {
              dispatch(
                fetchEntities({
                  page,
                  itemsPerPage,
                  sortBy,
                  searchByEntity: {
                    search,
                    entity: "institutions",
                  },
                })
              );
              return (
                response?.data?.message ||
                `Institution ${actionText}ed successfully!`
              );
            },
            error: (error) =>
              error?.response?.data?.error ||
              `Failed to ${actionText} institution`,
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  }

  return (
    <AdminLayout title="Institutions">
      <div className="page-header">
        <div>
          <h1>Institutions</h1>
          <p>Manage all institutions registered on the Nexora platform.</p>
        </div>
      </div>

      <AdminToolbar
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Type institution id / name / mail . . ."
        currentStatusFilter={statusFilter}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setPage={setPage}
        setStatusFilter={setStatusFilter}
        status_filters={STATUS_FILTERS}
        currentSortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="institution-grid">
        {institutions.documents.map((inst) => (
          <div className="institution-card" key={inst.institution_id}>
            <div className="institution-top">
              <div className="institution-logo">NA</div>
              <div>
                <div className="institution-name">
                  {inst.institution_name ?? "NA"}
                </div>
                <div className="institution-email">
                  {inst.institution_email}
                </div>
              </div>
            </div>

            <p className="institution-description">
              {inst.description ?? "NA"}
            </p>

            <div className="institution-meta">
              <div>
                <strong>0</strong>
                <span>Courses</span>
              </div>
              <div>
                <strong>0</strong>
                <span>Students</span>
              </div>
              <div>
                <strong>0</strong>
                <span>Instructors</span>
              </div>
            </div>

            <div style={{ marginTop: 15 }}>
              <StatusBadge status={inst.isBlocked ? "blocked" : "active"} />
            </div>

            <div className="card-actions">
              <button
                className="btn btn-outline btn-small"
                onClick={() =>
                  navigate(`/admin/institutions/${inst.institution_id}`)
                }
              >
                View
              </button>
              {inst.isBlocked ? (
                <button
                  className="btn btn-success btn-small"
                  onClick={() => {
                    updateInstitutionIsBlocked(inst.institution_id, false);
                  }}
                >
                  Unblock
                </button>
              ) : (
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => {
                    updateInstitutionIsBlocked(inst.institution_id, true);
                  }}
                >
                  Block
                </button>
              )}
            </div>
          </div>
        ))}

        {institutions.documents.length === 0 && (
          <div className="institution-card">No institutions found</div>
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={institutions.totalPages || 1}
        onPageChange={setPage}
      />

      <Modal
        isOpen={viewing !== null}
        onClose={() => setViewing(null)}
        title="Institution Details"
        subtitle="Review institution information."
        footer={
          <button
            className="btn btn-secondary"
            onClick={() => setViewing(null)}
          >
            Close
          </button>
        }
      >
        {viewing && (
          <DetailGrid
            items={[
              { label: "Institution Name", value: viewing.institution_name },
              { label: "Institution Email", value: viewing.institution_email },
              {
                label: "Year Established",
                value: formatDate(viewing.year_established),
              },
              { label: "Status", value: viewing.status },
              { label: "Official Website", value: viewing.official_website },
              { label: "Country", value: viewing.address.country },
              { label: "City", value: viewing.address.city },
              { label: "Postal Code", value: viewing.address.postalCode },
              {
                label: "Legal Organization",
                value: viewing.legal_information.legal_organization_name,
              },
              {
                label: "Registration Number",
                value: viewing.legal_information.registration_number,
              },
            ]}
          />
        )}
      </Modal>
    </AdminLayout>
  );
}
