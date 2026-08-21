
import { jwtDecode } from "jwt-decode";
import AdminLayout from "../components/admin/AdminLayout";
import type { CustomJwtPayload } from "./auth/Login.page";
import InstitutionLayout from "../components/institution/InstitutionLayout";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { useEffect } from "react";
import { fetchEntities } from "../features/institutionSlice";
import LoadingPage from "./Loader/Loading.page";
import { useNavigate } from "react-router";

export default function WorkInProgressPage() {
  const token = localStorage.getItem("token")
  const entity = jwtDecode(token) as CustomJwtPayload
  const {institution,loading} = useSelector((state : RootState) => state.institution)
  const {request} = useSelector((state : RootState) => state.request)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchEntities(entity._id))
  },[])
  const navigate = useNavigate()
  if(institution && !institution.isVerified){
    navigate(`/institution/onboarding/${entity._id}`)
  }
  if(loading){
    return (
      <LoadingPage />
    )
  }
  if(entity.role === "admin"){
    return (
      <AdminLayout title="Dashboard">
         <div className="page-header">
          <div>
            <h1>Work in progress 😊</h1>
          </div>
        </div>
      </AdminLayout>
    );
  }else if(entity.role === "institution"){

      return (<InstitutionLayout name={institution.institution_name}>
        <div className="page-header">
         <div>
           <h1>Work in progress 😊</h1>
         </div>
       </div>
     </InstitutionLayout>)

  }else if(entity.role === "instructor"){
    return (
      <InstitutionLayout name="Dummy University">
         <div className="page-header">
          <div>
            <h1>Work in progress 😊</h1>
          </div>
        </div>
      </InstitutionLayout>
    )
  }
  
}