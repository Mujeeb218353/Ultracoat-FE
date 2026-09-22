"use client";

import PageHeader from "@/components/PageHeader";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";

interface DieSizeLayoutProps {
  children: React.ReactNode;
}

const DieSizeLayout = ({ children }: DieSizeLayoutProps) => {
  const openModal = useOpenModal();

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader onClick={() => openModal("CREATE_SIZE")} />
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
};

export default DieSizeLayout;