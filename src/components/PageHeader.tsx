interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <header className="header-gradient">
      {title}
    </header>
  );
};

export default PageHeader;
