import { ArrowLeft } from "lucide-react";

const PageHeader = ({ title }) => {
  return (
    <header className="header-gradient flex items-center ">
      <ArrowLeft />
      <h1 className="w-full">{title}</h1>
    </header>
  );
};

export default PageHeader;
