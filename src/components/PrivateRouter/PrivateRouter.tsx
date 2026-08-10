
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../store/store";


interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user)
  if (user) {
  return children
}
return <Navigate to="/" />
}
