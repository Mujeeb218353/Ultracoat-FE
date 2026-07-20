"use client";

import { useState } from "react";
import { Button, Typography } from "antd";
import { User, Mail, Phone, MapPin, Shield, Pencil } from "lucide-react";
import { useUser } from "@/features/auth/selectors/auth.selector";
import EditProfileModal from "@/features/auth/components/EditProfileModal";

const ProfileCard = () => {
  const user = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography.Title level={4} className="m-0! dark:text-white!">
            Profile
          </Typography.Title>
          <Typography.Text className="text-sm! dark:text-white!">
            Manage your account information
          </Typography.Text>
        </div>
        <Button
          icon={<Pencil size={15} />}
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0A1F44]! text-white! border-none! hover:bg-[#0A1F44]/90!"
        >
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border border-gray-100 dark:border-white/10 rounded-2xl p-6">
        <ProfileField icon={<User size={16} />} label="Full Name" value={user.name} />
        <ProfileField icon={<Mail size={16} />} label="Email Address" value={user.email} />
        <ProfileField icon={<Phone size={16} />} label="Phone Number" value={user.phone} />
        <ProfileField icon={<MapPin size={16} />} label="Location" value={user.location} />
        <ProfileField icon={<Shield size={16} />} label="Role" value={user.role} />
      </div>

      <EditProfileModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

type ProfileFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const ProfileField = ({ icon, label, value }: ProfileFieldProps) => (
  <div>
    <Typography.Text className="text-xs font-semibold dark:text-white! mb-1.5 block">
      {label}
    </Typography.Text>
    <div className="flex items-center gap-2 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2.5 bg-gray-50 dark:bg-white/5">
      <span className="text-gray-400 dark:text-gray-500">{icon}</span>
      <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{value}</span>
    </div>
  </div>
);

export default ProfileCard;