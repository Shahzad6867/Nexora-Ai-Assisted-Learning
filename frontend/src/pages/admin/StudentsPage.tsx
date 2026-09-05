import { useEffect, useState } from "react";

import type { StatusKind } from "../../types/types";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import Modal from "../../components/admin/Modal";
import DetailGrid from "../../components/admin/DetailGrid";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchEntities } from "../../features/adminSlice";
import { toast } from "sonner";
import api from "../../api/api";
import LoadingPage from "../Loader/Loading.page";
import { AdminToolbar } from "../../components/admin/AdminToolbar";
import Pagination from "../../components/admin/Pagination";
import { formatDate } from "../../utilities/formatDateAndTime.utility";

const STATUS_FILTERS: { label: string; value: StatusKind | "all" }[] = [
  { label: "All Students", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
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
          entity: "students",
        },
      })
    );
  }, [page, itemsPerPage, sortBy, search]);
  const { students, loading } = useSelector((state: RootState) => state.admin);

  async function updateStudentIsBlocked(
    student_id: string,
    isBlocking: boolean
  ) {
    const actionText = isBlocking ? "block" : "unblock";

    toast(`Are you sure you want to ${actionText} this student?`, {
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
            _id: student_id,
            role: "student",
          });

          toast.promise(updatePromise, {
            loading: `${isBlocking ? "Blocking" : "Unblocking"} student...`,
            success: (response) => {
              dispatch(
                fetchEntities({
                  page,
                  itemsPerPage,
                  sortBy,
                  searchByEntity: {
                    search,
                    entity: "students",
                  },
                })
              );
              return (
                response?.data?.message ||
                `Student ${actionText}ed successfully!`
              );
            },
            error: (error) =>
              error?.response?.data?.error ||
              `Failed to ${actionText} student.`,
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
    <AdminLayout title="Students">
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>View and manage all students registered across the platform.</p>
        </div>
      </div>

      <AdminToolbar
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Type student id / full name / email . . ."
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
                <th>Student</th>
                <th>Student ID</th>
                <th>Enrolled Courses</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.documents.map((s) => (
                <tr key={s.student_id}>
                  <td>
                    {s.first_name} {s.last_name}
                  </td>
                  <td>{s.student_id}</td>
                  <td>NA</td>
                  <td>
                    <StatusBadge
                      status={s.is_blocked === false ? "active" : "blocked"}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-small"
                      style={{ marginRight: "5px" }}
                      onClick={() => setViewing(s)}
                    >
                      View
                    </button>
                    {s.is_blocked ? (
                      <button
                        className="btn btn-small btn-success"
                        onClick={() =>
                          updateStudentIsBlocked(s.student_id, false)
                        }
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="btn btn-small btn-danger"
                        style={{ marginRight: "5px" }}
                        onClick={() =>
                          updateStudentIsBlocked(s.student_id, true)
                        }
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {students.documents.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ color: "var(--muted)" }}>
                    No students found
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
        totalPages={students.totalPages || 1}
      />
      <Modal
        isOpen={viewing !== null}
        onClose={() => setViewing(null)}
        title="Student Details"
        subtitle="Platform student profile."
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
              { label: "Student ID", value: viewing.student_id },
              {
                label: "Full Name",
                value: `${viewing.first_name} ${viewing.last_name}`,
              },
              { label: "Email", value: viewing.email },
              { label: "Age", value: String(viewing.age) },
              { label: "Role", value: "Student" },
              { label: "Enrolled Courses", value: "NA" },
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
