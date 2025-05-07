import { FC, useEffect, useState } from "react";
import { validateSession } from "../api/validateToken";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { GuardProps } from "../types";

export const AuthGuard: FC<GuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
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
  if (isAuthenticated === false) {
    navigate("/login");
  }

  return <>{children}</>;
};
