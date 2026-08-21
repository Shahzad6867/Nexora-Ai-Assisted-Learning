
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import StatusBadge from "../../components/admin/StatusBadge";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchEntities } from "../../features/adminSlice";
import LoadingPage from "../Loader/Loading.page";



export default function InstructorsPage() {
  const {instructors,loading} = useSelector((state : RootState) => state.admin)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchEntities());
  }, []);
  // const institutionOptions = useMemo(
  //   () => Array.from(new Set(INSTRUCTORS.map((i) => i.institution))),
  //   []
  // );

  // const filtered = useMemo(() => {
  //   const term = search.toLowerCase();
  //   return INSTRUCTORS.filter((i) => {
  //     const matchesSearch = i.name.toLowerCase().includes(term);
  //     const matchesInstitution =
  //       institutionFilter === "all" || i.institution === institutionFilter;
  //     return matchesSearch && matchesInstitution;
  //   });
  // }, [search, institutionFilter]);

  if(loading){
    return (
      <LoadingPage />
    )
  }

  return (
    <AdminLayout title="Instructors">
      <div className="page-header">
        <div>
          <h1>Instructors</h1>
          <p>Monitor instructors working across registered institutions.</p>
        </div>
      </div>

      {/* <div className="toolbar">
        <input
          className="search"
          placeholder="Search instructor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter"
          value={institutionFilter}
          onChange={(e) => setInstitutionFilter(e.target.value)}
        >
          <option value="all">All Institutions</option>
          {institutionOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div> */}

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
              </tr>
            </thead>
            <tbody>
              {instructors.map((i) => (
                <tr key={i.instructor_id}>
                  <td>{i.first_name} {i.last_name}</td>
                  <td>{i.instructor_id}</td>
                  <td>{i.institution_id.institution_name}</td>
                  <td>{i.qualification.title}</td>
                  <td>
                    <StatusBadge status={i.isBlocked ? "blocked" : "active"} />
                  </td>
                </tr>
              ))}
              {instructors.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ color: "var(--muted)" }}>
                    No instructors match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
