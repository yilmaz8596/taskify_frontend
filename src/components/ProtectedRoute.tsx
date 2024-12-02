import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}
