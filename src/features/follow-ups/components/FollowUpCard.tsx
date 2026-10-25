import { useState } from "react";
import { Button } from "antd";
import { Calendar, MessageSquare, Pencil, Plus } from "lucide-react";
import dayjs from "dayjs";
import SectionCard from "@/features/quotations/components/SectionCard";
import FollowUpModal from "./FollowUpModal";
import { FollowUp } from "../types/follow-ups.types";

interface Props {
  quotationId: string;
  followUps: FollowUp[];
}

const FollowUpsCard = ({ quotationId, followUps }: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<FollowUp>();

  const openCreate = () => {
    setSelected(undefined);
    setOpen(true);
  };

  const openEdit = (f: FollowUp) => {
    setSelected(f);
    setOpen(true);
  };

  return (
    <>
      <SectionCard
        icon={MessageSquare}
        title={`Follow-ups (${followUps.length})`}
        className="w-full!"
        headerClassName="bg-[#001529] rounded-t-lg text-white"
      >
        <div className="flex flex-col gap-3">
          <Button type="primary" icon={<Plus size={14} />} onClick={openCreate}>
            Add Follow-up
          </Button>

          {followUps.length === 0 && (
            <p className="text-sm text-gray-400">No follow-ups yet.</p>
          )}

          {followUps.map((f) => {
            const isOverdue = !!f.nextFollowUpDate && dayjs(f.nextFollowUpDate).isBefore(dayjs());

            return (
              <div
                key={f.id}
                className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">{f.purpose}</span>
                  <Button
                    size="small"
                    type="text"
                    icon={<Pencil size={12} />}
                    onClick={() => openEdit(f)}
                  />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">{f.remarks}</p>

                {f.nextFollowUpDate && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <Calendar size={12} className="text-gray-400" />
                    <span className="text-gray-400">Next:</span>
                    <span className={`font-semibold ${isOverdue ? "text-red-600" : "text-green-700"}`}>
                      {dayjs(f.nextFollowUpDate).format("DD MMM YYYY, hh:mm A")}
                    </span>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </SectionCard>

      <FollowUpModal
        open={open}
        onClose={() => setOpen(false)}
        quotationId={quotationId}
        followUp={selected}
      />
    </>
  );
};

export default FollowUpsCard;