import type { ThemeConfig } from "antd";
import type { ThemeMode } from "@/features/theme/store/theme.store";

const PRIMARY = "#094c92";
const PRIMARY_HOVER = "#0a5eaf";
const PRIMARY_ACTIVE = "#073d77";
const PRIMARY_BG = "#e8f0fb";
const SECONDARY = "#ca3500";
const SECONDARY_HOVER = "#e1460c";
const SECONDARY_ACTIVE = "#a92b00";
const SECONDARY_BG = "#fff1eb";

const getCommonTokens = (darkModeEnabled: boolean) => ({
  colorPrimary: PRIMARY,
  colorPrimaryHover: PRIMARY_HOVER,
  colorPrimaryActive: PRIMARY_ACTIVE,
  colorPrimaryBg: darkModeEnabled ? "#102a4d" : PRIMARY_BG,

  fontSize: 12,
  colorText: darkModeEnabled ? "#f3f4f6" : "#111827",
  colorTextSecondary: darkModeEnabled ? "#cbd5e1" : "#6b7280",
  colorTextTertiary: darkModeEnabled ? "#94a3b8" : "#9ca3af",
  colorTextPlaceholder: darkModeEnabled ? "#94a3b8" : "#9ca3af",

  colorBgContainer: darkModeEnabled ? "#111827" : "#ffffff",
  colorBgLayout: darkModeEnabled ? "#0f172a" : "#f5f7fa",
  colorBgElevated: darkModeEnabled ? "#111827" : "#ffffff",

  colorBorder: darkModeEnabled ? "#374151" : "#d1d5db",
  colorBorderSecondary: darkModeEnabled ? "#1f2937" : "#e5e7eb",
  borderRadius: 8,

  colorLink: PRIMARY,
  colorLinkHover: PRIMARY,
  colorLinkActive: PRIMARY_ACTIVE,
  linkDecoration: "none",
});

const getAntdTheme = (mode: ThemeMode): ThemeConfig => {
  const darkModeEnabled = mode === "dark";

  return {
    token: getCommonTokens(darkModeEnabled),
    components: {
      Button: {
        controlHeight: 42,
        fontWeight: 600,
        borderRadius: 10,
        colorPrimary: PRIMARY,
        colorPrimaryHover: PRIMARY_HOVER,
        colorPrimaryActive: PRIMARY_ACTIVE,
        primaryColor: "#ffffff",
        defaultColor: SECONDARY,
        defaultBorderColor: SECONDARY,
        defaultHoverColor: SECONDARY_HOVER,
        defaultHoverBorderColor: SECONDARY_HOVER,
        defaultActiveBorderColor: SECONDARY_ACTIVE,
        defaultActiveColor: SECONDARY_ACTIVE,
      },

      Input: {
        controlHeight: 42,
        borderRadius: 10,
        activeBorderColor: PRIMARY,
        hoverBorderColor: PRIMARY_HOVER,
        activeShadow: `0 0 0 3px ${darkModeEnabled ? "rgba(9, 76, 146, 0.25)" : PRIMARY_BG}`,
      },

      Checkbox: {
        colorPrimary: PRIMARY,
        colorPrimaryHover: PRIMARY_HOVER,
        colorBgContainerDisabled: darkModeEnabled ? "#1f2937" : "#f3f4f6",
        borderRadiusSM: 4,
      },

      Select: {
        controlHeight: 42,
        borderRadius: 10,
        optionSelectedBg: darkModeEnabled ? "#102a4d" : PRIMARY_BG,
        optionSelectedColor: PRIMARY,
        optionActiveBg: darkModeEnabled ? "#1f2937" : SECONDARY_BG,
      },

      Card: {
        borderRadiusLG: 20,
      },

      Table: {
        borderRadius: 0,
        borderRadiusLG: 0,
        headerSplitColor: "transparent",
      },

      Spin: {
        colorPrimary: PRIMARY,
      },
    },
  };
};

export default getAntdTheme;