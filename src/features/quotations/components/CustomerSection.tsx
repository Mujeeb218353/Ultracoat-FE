"use client";

import { Building2, User } from "lucide-react";
import { Select } from "antd";
import SectionCard from "./SectionCard";
import useCustomersList from "@/features/customers/hooks/use-customer-list";
import { CustomersResponse } from "@/features/customers/types/customers.types";

interface Props {
  value?: string;
  onChange?: (id: string) => void;
}

const CustomerSection = ({ value, onChange }: Props) => {
  const { data, isFetching, refetch: fetchCustomers } = useCustomersList({ enabled: false });
  const rawData = data as CustomersResponse | undefined;
  const customers = rawData?.customers?? [];

  const options = customers.map((c) => ({
    value: c.id as string,
    label: c.name as string,
  }));

  const selectedCustomer = customers.find((c) => c.id === value);

  return (
    <SectionCard icon={Building2} title="Customer">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Select Customer
        </label>

        <div className="flex flex-col justify-between items-center sm:flex-row gap-4">
          <div className="w-full sm:w-72">
            <Select
              className="w-full h-10"
              showSearch={{ optionFilterProp: "label" }}
              loading={isFetching}
              onOpenChange={(open) => {
                if (open && !data) fetchCustomers();
              }}
              placeholder="— Select a customer —"
              value={value}
              onChange={onChange}
              options={options}
            />
          </div>

          {selectedCustomer && (
            <div className="flex items-start gap-3 rounded-lg border border-gray-300 bg-slate-200 dark:bg-slate-900/50 dark:border-white/5 p-3 min-w-[320px]">
              <div className="mt-0.5 rounded p-1 text-gray-400 dark:bg-gray-800">
                <User size={13} />
              </div>

              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-gray-400">
                <div className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {selectedCustomer.name}
                </div>
                {selectedCustomer.designation && (
                  <div className="truncate">• {selectedCustomer.designation}</div>
                )}
                {selectedCustomer.phone && (
                  <div className="truncate">{selectedCustomer.phone}</div>
                )}
                {selectedCustomer.company && (
                  <div className="truncate">• {selectedCustomer.company}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
};

export default CustomerSection;