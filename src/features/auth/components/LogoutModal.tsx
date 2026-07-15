import { Modal } from "antd";
import useLogout from "../hooks/use-logout";


interface LogoutModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isVisible, onClose }: LogoutModalProps) => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {

    logout(undefined, {
      onSuccess: () => {
        onClose();
      },
    });

  };

  return (
    <Modal
      title="Logout Confirmation"
      open={isVisible}
      onOk={handleLogout}
      onCancel={onClose}
      confirmLoading={isPending}
      okText="Logout"
      cancelText="Cancel"
      centered
      okButtonProps={{ 
        danger: true, 
        type: "primary", 
        className: "border-none! shadow-none!" 
      }}
    >
      <p className="text-sm my-10 mt-5">
        Are you sure you want to log out? You will need to sign in again to access your account.
      </p>
    </Modal>
  );
};

export default LogoutModal;