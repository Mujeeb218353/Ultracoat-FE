"use client";

import RepresentativesTable from "@/features/representatives/components/RepresentativesTable";
import CreateRepresentativeModal from "@/features/representatives/components/CreateSalesRepresentativeModal";
import UpdateRepresentativeModal from "@/features/representatives/components/UpdateSalesRepresentativeModal";

const RepresentativesPage = () => {

  return (
    <div>
      <RepresentativesTable />
      <CreateRepresentativeModal />
      <UpdateRepresentativeModal />
    </div>
  );
};

export default RepresentativesPage;