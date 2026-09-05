"use client";

import RepresentativesTable from "@/features/representatives/components/RepresentativesTable";
import CreateRepresentativeModal from "@/features/representatives/components/CreateSalesRepresentativeModal";
import ViewRepresentativeModal from "@/features/representatives/components/ViewRepresentativeModal";
import UpdateRepresentativeModal from "@/features/representatives/components/UpdateSalesRepresentativeModal";

const RepresentativesPage = () => {

  return (
    <div>
      <RepresentativesTable />
      <CreateRepresentativeModal />
      <UpdateRepresentativeModal />
      <ViewRepresentativeModal />
    </div>
  );
};

export default RepresentativesPage;