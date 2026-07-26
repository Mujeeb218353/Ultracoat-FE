"use client";

import { useSetAlertApi } from "@/features/alert/selectors/alert.selector";
import { message } from "antd";
import { useEffect } from "react";

const Alert = () => {
  const [api, contextHolder] = message.useMessage();
  const setApi = useSetAlertApi();

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