import { useEffect, useState } from "react";
import InstitutionLayout from "../../components/institution/InstitutionLayout";
import Modal from "../../components/institution/Modal";
import DetailGrid from "../../components/admin/DetailGrid";
import AddInstructorModal from "../../components/institution/AddInstructorModal";
import type { Instructor } from "../../types/types";
import { type AppDispatch, type RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities } from "../../features/institutionSlice";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../auth/Login.page";
import LoadingPage from "../Loader/Loading.page";


export default function InstructorsPage() {
  const token = localStorage.getItem("token")
  const {institution} = useSelector((state : RootState) => state.institution)
  const institutionFromToken = jwtDecode(token) as CustomJwtPayload

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchEntities(institutionFromToken._id))
  },[])
  const [viewing, setViewing] = useState<Instructor | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const {instructors,loading} = useSelector((state : RootState) => state.institution)
  // const filtered = useMemo(() => {
  //   const term = search.toLowerCase();
  //   return instructors.filter((i) => {
  //     const fullName = `${i.first_name} ${i.last_name}`.toLowerCase();
  //     const matchesSearch = fullName.includes(term) || i.instructor_mail.toLowerCase().includes(term);
  //     const matchesStatus =
  //       statusFilter === "all" || (statusFilter === "blocked" ? i.isBlocked : !i.isBlocked);
  //     return matchesSearch && matchesStatus;
  //   });
  // }, [instructors, search, statusFilter]);


  function handleToggleBlock(id: string) {
    const target = instructors.find((i) => i._id === id);
    if (target) {

    }
  }
  if(loading){
    return (
      <LoadingPage />
    )
  }

  return (
    <InstitutionLayout name={institution.institution_name}>
      <div className="page-header">
        <div>
          <h1>Instructors</h1>
          <p>Manage the instructors teaching at your institution.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
          + Add Instructor
        </button>
      </div>

      {/* <div className="toolbar">
        <input
          className="search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "blocked")}
        >
          <option value="all">All Instructors</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div> */}

      <div className="table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Instructor</th>
                <th>Instructor ID</th>
                <th>Qualification</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((i) => (
                <tr key={i._id}>
                  <td>
                    <div className="instructor-cell">
                      <div className="instructor-avatar">
                        {i.first_name[0]}
                        {i.last_name[0]}
                      </div>
                      <div>
                        <div className="instructor-name">
                          {i.first_name} {i.last_name}
                        </div>
                        <div className="instructor-sub">{i.instructor_mail}</div>
                      </div>
                    </div>
                  </td>
                  <td>{i.instructor_id}</td>
                  <td>{i.qualification.title || "—"}</td>
                  <td>
                    <span className={`status ${i.isBlocked ? "status-blocked" : "status-active"}`}>
                      <span className="status-dot" />
                      {i.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-outline btn-small" onClick={() => setViewing(i)}>
                        View
                      </button>
                      <button
                        className={`btn btn-small ${i.isBlocked ? "btn-success" : "btn-danger"}`}
                        onClick={() => handleToggleBlock(i._id)}
                      >
                        {i.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {instructors.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ color: "var(--muted)" }}>
                    No instructors match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={viewing !== null}
        onClose={() => setViewing(null)}
        title={viewing ? `${viewing.first_name} ${viewing.last_name}` : ""}
        subtitle="Instructor profile"
        footer={
          <button className="btn btn-secondary" onClick={() => setViewing(null)}>
            Close
          </button>
        }
      >
        {viewing && (
          <>
            <DetailGrid
              items={[
                { label: "Instructor ID", value: viewing.instructor_id },
                { label: "Instructor Email", value: viewing.instructor_mail },
                { label: "Personal Email", value: viewing.personal_email },
                { label: "Age", value: String(viewing.age) },
                { label: "Date of Birth", value: viewing.date_of_birth },
                { label: "Status", value: viewing.isBlocked ? "Blocked" : "Active" },
                { label: "About", value: viewing.about, full: true },
              ]}
            />
            <div className="section-divider">Qualification</div>
            <DetailGrid
              items={[
                { label: "Title", value: viewing.qualification.title },
                { label: "Type", value: viewing.qualification.type },
                { label: "Issuing Institution", value: viewing.qualification.institution },
                { label: "Issue Date", value: viewing.qualification.issue_date },
                { label: "Document", value: viewing.qualification.document_url || "Not uploaded", full: true },
              ]}
            />
          </>
        )}
      </Modal>

      <AddInstructorModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}  />


    </InstitutionLayout>
  );
}
