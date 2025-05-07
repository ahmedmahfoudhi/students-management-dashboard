import { useLocation, useNavigate } from "react-router-dom";

export default function useToggleDrawer() {
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = (show: boolean, key: string) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set(key, show ? "true" : "false");
    if (show) {
      navigate(`?${queryParams.toString()}`, { replace: true });
    } else {
      queryParams.delete(key);
      navigate(`?${queryParams.toString()}`, { replace: true });
    }
    
  }
  return toggleDrawer

}