"use client";

import { Building2, User } from "lucide-react";
import PaginatedSelect from "@/components/PaginatedSelect";
import { useState } from "react";
import SectionCard from "./SectionCard";
import useCustomersOptions, { getCustomerOption } from "@/features/customers/hooks/use-customer-list";
import { Customer } from "@/features/customers/types/customers.types";

interface Props {
  value?: string;
  onChange?: (id: string) => void;
  onCustomerChange?: (customer?: Customer) => void;
}

const CustomerSection = ({ value, onChange, onCustomerChange }: Props) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

  return (
    <SectionCard icon={Building2} title="Customer">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Select Customer
        </label>

        <div className="flex flex-col justify-between items-center sm:flex-row gap-4">
          <div className="w-full sm:w-72">
            <PaginatedSelect
              className="w-full h-10"
              placeholder="— Select a customer —"
              value={value}
              useOptions={useCustomersOptions}
              getOption={getCustomerOption}
              onChange={(id, customer) => {
                setSelectedCustomer(customer);
                onCustomerChange?.(customer);
                onChange?.(id);
              }}
            />
          </div>

          {value && selectedCustomer && (
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