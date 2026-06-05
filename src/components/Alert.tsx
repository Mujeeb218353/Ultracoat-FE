"use client";

import { useEffect } from "react";
import { message } from "antd";
import useAlertStore from "@/features/alert/store/alert.store";

const Alert = () => {
  const [api, contextHolder] = message.useMessage();
  const setApi = useAlertStore((s) => s.setApi);

  useEffect(() => {
    setApi(api);
  }, [api, setApi]);

  return (
    <>
      {contextHolder}
    </>
  );
};

export default Alert;