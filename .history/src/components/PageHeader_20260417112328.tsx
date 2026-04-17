import { ArrowBigLeft } from "lucide-react";

const PageHeader = ({ title }) => {
  return <header className="header-gradient flex items-center justify-center">
    <ArrowBigLeft />
    {title}</header>;
};

export default PageHeader;
