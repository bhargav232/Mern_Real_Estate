import { useSelector } from "react-redux/es/hooks/useSelector"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div>
      {
        currentUser? (<Outlet/>):(<Navigate to  = "sign-in"/>)
      }
    </div>
  )
}
// useNvigate is hook but Navigate is component!