import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchEntities } from "../../features/instructorSlice";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../../pages/auth/Login.page";
import LoadingPage from "../../pages/Loader/Loading.page";

interface InstitutionTopbarProps {
  name?: string;
  initials?: string;
}

export default function InstructorTopbar({
}) {
  const {token} = useSelector((state : RootState) => state.auth)
  const {loading,instructor} = useSelector((state : RootState) => state.instructor)
  const instructorToken = jwtDecode(token) as CustomJwtPayload
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchEntities(instructorToken._id))
  },[])
  if(loading){
    return (
      <LoadingPage />
    )
  }
  const fullName = instructor.first_name + " " + instructor.last_name
  const splittedName = fullName.split(" ")
  const initials = `${splittedName[0][0]}${splittedName[1] ? splittedName[1][0] : ""}${splittedName[2] ? splittedName[2][0] : ""}`
  return (
    <header className="topbar">
      <div className="profile">
        <div className="avatar">{initials}</div>
        {fullName}
      </div>
    </header>
  );
}
