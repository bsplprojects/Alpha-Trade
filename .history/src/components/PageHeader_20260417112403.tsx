import { ArrowBigLeft } from "lucide-react";

const PageHeader = ({ title }) => {
  return (
    <header className="header-gradient flex items-center ">
      <ArrowBigLeft />
      <h1 clas>{title}</h1>
    </header>
  );
};

export default PageHeader;
