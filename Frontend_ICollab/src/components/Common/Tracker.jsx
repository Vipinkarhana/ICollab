import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../../Services/adminService";

const Tracker = () => {
  const location = useLocation();

  useEffect(() => {
    const key = `pageViewTracked-${location.pathname}`;

    if (!sessionStorage.getItem(key)) {
      trackPageView(location.pathname)
        .then(() => sessionStorage.setItem(key, "true"))
        .catch((err) => console.error("Tracking failed", err));
    }
  }, [location]);

  return null;
};

export default Tracker;
