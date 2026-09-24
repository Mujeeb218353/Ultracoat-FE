import CreateFeatureModal from "@/features/features/components/CreateFeatureModal";
import FeaturesTable from "@/features/features/components/FeaturesTable";
import ViewFeatureModal from "@/features/features/components/ViewFeatureModal";
import UpdateFeatureModal from "@/features/features/components/UpdateFeatureModal";
import DeleteFeatureModal from "@/features/features/components/DeleteFeatureModal";

const FeatureManagementPage = () => {
  return (
    <div>
      <FeaturesTable />
      <CreateFeatureModal />
      <ViewFeatureModal />
      <UpdateFeatureModal />
      <DeleteFeatureModal />
    </div>
  );
};

export default FeatureManagementPage;