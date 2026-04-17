import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title }) => {
  const navigate = useNavigate();
  return (
    <header className="header-gradient flex items-center ">
      <ArrowLeft onClick={() => navigate(-1)} />
      <h1 className="w-full">{title}</h1>
    </header>
  );
};

export default PageHeader;
