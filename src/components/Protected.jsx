import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const memberId = sessionStorage.getItem("memberId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!memberId) {
      navigate("/login");
    }
  }, [memberId]);

  return <div className="page-content">{children}</div>;
};

export default Protected;
