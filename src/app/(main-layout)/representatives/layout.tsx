"use client";

import PageHeader from "@/components/PageHeader";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";

interface RepresentativesLayoutProps {
  children: React.ReactNode;
};

const RepresentativesLayout = ({ children }: RepresentativesLayoutProps) => {
  const openModal = useOpenModal();

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader 
        onClick={() => openModal("CREATE_REPRESENTATIVE")}
      />
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default RepresentativesLayout;