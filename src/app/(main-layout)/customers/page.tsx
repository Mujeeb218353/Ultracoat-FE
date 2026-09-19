import CustomersTable from "@/features/customers/components/CustomersTable";
import CreateCustomerModal from "@/features/customers/components/CreateCustomerModal";
import UpdateCustomerModal from "@/features/customers/components/UpdateCustomerModal";
import DeleteCustomerModal from "@/features/customers/components/DeleteCustomerModal";
import ViewCustomerModal from "@/features/customers/components/ViewCustomerModal";

const Page = () => {
  return (
    <div>
      <CustomersTable />
      <CreateCustomerModal />
      <UpdateCustomerModal />
      <DeleteCustomerModal />
      <ViewCustomerModal />
    </div>
  );
};

export default Page;