import { useEffect, useMemo, useState } from "react";
import type { Institution, StatusKind } from "../../types/types";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import Modal from "../../components/admin/Modal";
import DetailGrid from "../../components/admin/DetailGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities } from "../../features/adminSlice";
import type { AppDispatch, RootState } from "../../app/store";
import { useNavigate } from "react-router";



const STATUS_FILTERS: { label: string; value: StatusKind | "all" }[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Suspended", value: "suspended" },
];

export default function InstitutionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusKind | "all">("all");
  const [viewing, setViewing] = useState(null);
  const appDispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    appDispatch(fetchEntities());
  }, []);
  const { institutions } = useSelector((state: RootState) => state.admin);
  const navigate = useNavigate()

  // const filtered = useMemo(() => {
  //   return institutions.filter((inst) => {
  //     const matchesSearch = inst.name
  //       .toLowerCase()
  //       .includes(search.toLowerCase());
  //     const matchesStatus =
  //       statusFilter === "all" || inst.status === statusFilter;
  //     return matchesSearch && matchesStatus;
  //   });
  // }, [institutions, search, statusFilter]);

  // function handleSuspend(id: string) {
  //   setInstitutions((prev) =>
  //     prev.map((inst) =>
  //       inst.id === id ? { ...inst, status: "suspended" } : inst
  //     )
  //   );
  //   // showToast("Institution suspended");
  // }

  return (
    <AdminLayout title="Institutions">
      <div className="page-header">
        <div>
          <h1>Institutions</h1>
          <p>Manage all institutions registered on the Nexora platform.</p>
        </div>
      </div>

      {/* <div className="toolbar">
        <input
          className="search"
          placeholder="Search institution..."
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

      <div className="institution-grid">
        {institutions.map((inst) => (
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
                    onClick={() => navigate(`/admin/institutions/${inst.institution_id}`)}
                  >
                    View
                  </button>
                  {inst.isBlocked ? (
                     <button
                     className="btn btn-success btn-small"
                     onClick={() => {}}
                   >
                     Unblock
                   </button>
                  ) : (
                      <button
                      className="btn btn-danger btn-small"
                      onClick={() => {}}
                    >
                      Block
                    </button>

                  )}                  

            </div>
          </div>
        ))}

        {/* {filtered.length === 0 && (
          <p style={{ color: "var(--muted)", fontSize: 12 }}>
            No institutions match your search.
          </p>
        )} */}
      </div>

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
              { label: "Year Established", value: viewing.year_established },
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
