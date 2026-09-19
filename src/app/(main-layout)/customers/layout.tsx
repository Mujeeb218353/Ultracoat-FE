"use client";

import PageHeader from "@/components/PageHeader";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";

interface CustomersLayoutProps {
  children: React.ReactNode;
};

const CustomersLayout = ({ children }: CustomersLayoutProps) => {
  const openModal = useOpenModal();

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader 
        onClick={() => openModal("CREATE_CUSTOMER")}
      />
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default CustomersLayout;