import { Backpack } from "lucide-react";

const PageHeader = ({ title }) => {
  return <header className="header-gradient">
    <Backpack/>
    {title}</header>;
};

export default PageHeader;
