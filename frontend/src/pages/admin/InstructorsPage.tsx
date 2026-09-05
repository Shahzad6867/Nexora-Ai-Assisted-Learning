import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { fetchEntities } from "../../features/adminSlice";
import LoadingPage from "../Loader/Loading.page";
import Modal from "../../components/admin/Modal";
import DetailGrid from "../../components/admin/DetailGrid";
import { toast } from "sonner";
import api from "../../api/api";
import Pagination from "../../components/admin/Pagination";
import { AdminToolbar } from "../../components/admin/AdminToolbar";
import { formatDate } from "../../utilities/formatDateAndTime.utility";

const STATUS_FILTERS = [
  { label: "All Instructors", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

export default function InstructorsPage() {
  const { instructors, loading } = useSelector(
    (state: RootState) => state.admin
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("newest");
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
          entity: "instructors",
        },
      })
    );
  }, [page, itemsPerPage, sortBy, search]);

  async function updateInstructorIsBlocked(
    instructor_id: string,
    isBlocking: boolean
  ) {
    const actionText = isBlocking ? "block" : "unblock";

    toast(`Are you sure you want to ${actionText} this instructor ?`, {
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
            _id: instructor_id,
            role: "instructor",
          });

          toast.promise(updatePromise, {
            loading: `${isBlocking ? "Blocking" : "Unblocking"} instructor...`,
            success: (response) => {
              dispatch(
                fetchEntities({
                  page,
                  itemsPerPage,
                  sortBy,
                  searchByEntity: {
                    search,
                    entity: "instructors",
                  },
                })
              );
              return (
                response?.data?.message ||
                `Instructor ${actionText}ed successfully!`
              );
            },
            error: (error) =>
              error?.response?.data?.error ||
              `Failed to ${actionText} instructor`,
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AdminLayout title="Instructors">
      <div className="page-header">
        <div>
          <h1>Instructors</h1>
          <p>Monitor instructors working across registered institutions.</p>
        </div>
      </div>

      <AdminToolbar
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Type instructors id / name / mail / personal email . . ."
        currentStatusFilter={statusFilter}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setPage={setPage}
        setStatusFilter={setStatusFilter}
        status_filters={STATUS_FILTERS}
        currentSortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Instructor ID</th>
                <th>Institution</th>
                <th>Qualification</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.documents.map((i) => (
                <tr key={i.instructor_id}>
                  <td>
                    {i.first_name} {i.last_name}
                  </td>
                  <td>{i.instructor_id}</td>
                  <td>{i.institution_id.institution_name}</td>
                  <td>{i.qualification.title}</td>
                  <td>
                    <StatusBadge status={i.isBlocked ? "blocked" : "active"} />
                  </td>
                  <td>
                    <button
                      className="btn btn-small btn-outline"
                      style={{ marginRight: "5px" }}
                      onClick={() => setViewing(i)}
                    >
                      View
                    </button>
                    {i.is_blocked ? (
                      <button
                        className="btn btn-small btn-success"
                        onClick={() =>
                          updateInstructorIsBlocked(i.instructor_id, false)
                        }
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="btn btn-small btn-danger"
                        style={{ marginRight: "5px" }}
                        onClick={() =>
                          updateInstructorIsBlocked(i.instructor_id, true)
                        }
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {instructors.documents.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ color: "var(--muted)" }}>
                    No instructors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={instructors.totalPages || 1}
      />
      <Modal
        isOpen={viewing !== null}
        onClose={() => setViewing(null)}
        title="Instructor Details"
        subtitle="Platform instructor profile"
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
              { label: "Instructor ID", value: viewing.instructor_id },
              {
                label: "Full Name",
                value: `${viewing.first_name} ${viewing.last_name}`,
              },
              { label: "Age", value: String(viewing.age) },
              { label: "Role", value: "Instructor" },
              {
                label: "Institution",
                value: viewing.institution_id.institution_name,
              },
              {
                label: "Institution ID",
                value: viewing.institution_id.institution_id,
              },
              { label: "Qualification", value: viewing.qualification.title },
              { label: "Assigned Subjects", value: "NA" },
              {
                label: "Account Created",
                value: formatDate(viewing.createdAt),
              },
              {
                label: "Account Status",
                value: viewing.is_blocked === false ? "Active" : "Blocked",
              },
            ]}
          />
        )}
      </Modal>
    </AdminLayout>
  );
}
