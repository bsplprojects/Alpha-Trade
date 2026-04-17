import { ArrowBigLeft } from "lucide-react";

const PageHeader = ({ title }) => {
  return <header className="header-gradient flex items-center justif">
    <ArrowBigLeft />
    {title}</header>;
};

export default PageHeader;
