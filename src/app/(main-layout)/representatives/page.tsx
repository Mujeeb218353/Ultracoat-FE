"use client";

import RepresentativesTable from "@/features/representatives/components/RepresentativesTable";
import CreateRepresentativeModal from "@/features/representatives/components/CreateSalesRepresentativeModal";
import ViewRepresentativeModal from "@/features/representatives/components/ViewRepresentativeModal";
import UpdateRepresentativeModal from "@/features/representatives/components/UpdateSalesRepresentativeModal";
import UpdateRepresentativeEmailModal from "@/features/representatives/components/UpdateRepresentativeEmailModal";
import DeleteRepresentativeModal from "@/features/representatives/components/DeleteRepresentativeModal";

const RepresentativesPage = () => {

  return (
    <div>
      <RepresentativesTable />
      <CreateRepresentativeModal />
      <UpdateRepresentativeModal />
      <UpdateRepresentativeEmailModal />
      <DeleteRepresentativeModal />
      <ViewRepresentativeModal />
    </div>
  );
};

export default RepresentativesPage;