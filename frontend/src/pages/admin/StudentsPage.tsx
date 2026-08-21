import { useEffect, useState } from "react";

import type { StatusKind } from "../../types/types";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import Modal from "../../components/admin/Modal";
import DetailGrid from "../../components/admin/DetailGrid";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchEntities } from "../../features/adminSlice";

const STATUS_FILTERS: { label: string; value: StatusKind | "all" }[] = [
  { label: "All Students", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusKind | "all">("all");
  const [viewing, setViewing] = useState(null);
  const appDispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    appDispatch(fetchEntities());
  }, []);
  const { students } = useSelector((state: RootState) => state.admin);

  return (
    <AdminLayout title="Students">
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>View and manage all students registered across the platform.</p>
        </div>
      </div>

      {/* <div className="toolbar">
        <input
          className="search"
          placeholder="Search by student ID or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as StatusKind | "all")
          }
        >
          {STATUS_FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div> */}

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
              {students.map((s) => (
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
                    <button
                      className="btn btn-small btn-danger"
                      style={{ marginRight: "5px" }}
                      onClick={() => setViewing(s)}
                    >
                      Block
                    </button>
                    <button
                      className="btn btn-small btn-success"
                      onClick={() => setViewing(s)}
                    >
                      Unblock
                    </button>
                  </td>
                </tr>
              ))}
              {/* {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ color: "var(--muted)" }}>
                    No students match your search.
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>

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
              { label: "Age", value: String(viewing.age) },
              { label: "Role", value: "Student" },
              { label: "Enrolled Courses", value: "NA" },
              { label: "Account Created", value: viewing.createdAt },
              {
                label: "Account Status",
                value: viewing.status === false ? "active" : "blocked",
              },
            ]}
          />
        )}
      </Modal>
    </AdminLayout>
  );
}
