import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import type { GetProp, MessageArgsProps } from "antd";

type MessageStyles = GetProp<MessageArgsProps, "styles", "Return">;
type MessageType = "success" | "error" | "warning" | "info";

export const alertIcons: Record<MessageType, React.ReactNode> = {
  success: <CheckCircle2 size={18} color="#237804" />,
  error: <XCircle size={18} color="#cf1322" />,
  warning: <AlertTriangle size={18} color="#ad6800" />,
  info: <Info size={18} color="#0958d9" />,
};

const messageStyles: Record<MessageType, MessageStyles> = {
  success: {
    root: {
      backgroundColor: "#f6ffed",
      border: "2px solid #95de64",
      borderRadius: 16,
      boxShadow: "4px 4px 0 #d9f7be",
    },
    icon: { color: "#237804" },
    title: { color: "#237804", fontWeight: 600 },
  },
  error: {
    root: {
      backgroundColor: "#fff2f0",
      border: "2px solid #ffccc7",
      borderRadius: 16,
      boxShadow: "4px 4px 0 #ffccc7",
    },
    icon: { color: "#cf1322" },
    title: { color: "#cf1322", fontWeight: 600 },
  },
  warning: {
    root: {
      backgroundColor: "#fffbe6",
      border: "2px solid #ffe58f",
      borderRadius: 16,
      boxShadow: "4px 4px 0 #fff1b8",
    },
    icon: { color: "#ad6800" },
    title: { color: "#ad6800", fontWeight: 600 },
  },
  info: {
    root: {
      backgroundColor: "#e6f4ff",
      border: "2px solid #91caff",
      borderRadius: 16,
      boxShadow: "4px 4px 0 #bae0ff",
    },
    icon: { color: "#0958d9" },
    title: { color: "#0958d9", fontWeight: 600 },
  },
};

export default messageStyles;