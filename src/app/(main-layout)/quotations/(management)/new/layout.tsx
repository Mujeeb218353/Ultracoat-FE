
interface CreateQuotationLayoutProps {
  children: React.ReactNode;
}

const CreateQuotationLayout = ({ children }: CreateQuotationLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default CreateQuotationLayout;