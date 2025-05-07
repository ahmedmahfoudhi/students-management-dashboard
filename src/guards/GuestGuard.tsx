import { Spin } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { validateSession } from "../api/validateToken";
import { GuardProps } from "../types";

export const GuestGuard: FC<GuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateSession();
      setIsAuthenticated(isValid);
    };
    checkAuth();
  }, []);
  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spin />
      </div>
    );
  }
  if (isAuthenticated === true) {
    navigate("/");
  }
  return <>{children}</>;
};
