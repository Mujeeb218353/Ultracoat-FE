import SizesTable from "@/features/sizes/components/SizesTable";
import CreateSizeModal from "@/features/sizes/components/CreateSizeModal";
import UpdateSizeModal from "@/features/sizes/components/UpdateSizeModal";
import ViewSizeModal from "@/features/sizes/components/ViewSizeModal";
import DeleteSizeModal from "@/features/sizes/components/DeleteSizeModal";

const Page = () => {
  return (
    <div>
      <SizesTable />
      <CreateSizeModal />
      <UpdateSizeModal />
      <ViewSizeModal />
      <DeleteSizeModal />
    </div>
  );
};

export default Page;