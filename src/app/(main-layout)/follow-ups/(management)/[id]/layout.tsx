interface LayoutProps {
  children: React.ReactNode;
};

const FollowUpsByQuotationLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default FollowUpsByQuotationLayout;