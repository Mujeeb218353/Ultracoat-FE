import type { ThemeConfig } from "antd";
import type { ThemeMode } from "@/features/theme/store/theme.store";

const PRIMARY = "#001259";
const PRIMARY_HOVER = "#002875";
const PRIMARY_ACTIVE = "#000c40";
const PRIMARY_BG = "#ffffff";
// const SECONDARY = "#ca3500";
const SECONDARY_HOVER = "#e1460c";
const SECONDARY_ACTIVE = "#a92b00";
const SECONDARY_BG = "#fff1eb";

const SELECTED_COLOR = "#1568DC";

const DARK_BG = "#222222";

const getCommonTokens = (darkModeEnabled: boolean) => ({
  colorPrimary: PRIMARY,
  colorPrimaryHover: PRIMARY_HOVER,
  colorPrimaryActive: PRIMARY_ACTIVE,
  colorPrimaryBg: darkModeEnabled ? "#2f2f2f" : PRIMARY_BG,

  fontSize: 12,

  colorText: darkModeEnabled ? "#f3f4f6" : "#111827",
  colorTextSecondary: darkModeEnabled ? "#cbd5e1" : "#6b7280",
  colorTextTertiary: darkModeEnabled ? "#94a3b8" : "#9ca3af",
  colorTextPlaceholder: darkModeEnabled ? "#94a3b8" : "#9ca3af",

  colorBgContainer: darkModeEnabled ? DARK_BG : "#ffffff",
  colorBgLayout: darkModeEnabled ? DARK_BG : "#f5f7fa",
  colorBgElevated: darkModeEnabled ? DARK_BG : "#ffffff",

  colorBorder: darkModeEnabled ? "#374151" : "#d1d5db",
  colorBorderSecondary: darkModeEnabled ? "#1f2937" : "#e5e7eb",

  borderRadius: 8,

  colorLink: "#2563eb",
  colorLinkHover: "#1d4ed8",
  colorLinkActive: PRIMARY_ACTIVE,
  linkDecoration: "none",
});

const getAntdTheme = (mode: ThemeMode): ThemeConfig => {
  const darkModeEnabled = mode === "dark";

  return {
    token: getCommonTokens(darkModeEnabled),

    components: {
      Menu: {
        itemSelectedColor: "#ffffff",
        itemSelectedBg: SELECTED_COLOR,
        itemHoverColor: SELECTED_COLOR,
        itemHoverBg: darkModeEnabled ? "rgba(21, 104, 220, 0.15)" : "#e6f4ff",

        darkItemSelectedBg: SELECTED_COLOR,
        darkItemSelectedColor: "#ffffff",
        darkItemHoverBg: "rgba(21, 104, 220, 0.3)",
        darkItemHoverColor: "#ffffff",
      },

      Button: {
        colorPrimary: PRIMARY,
        colorPrimaryHover: PRIMARY_HOVER,
        colorPrimaryActive: PRIMARY_ACTIVE,
        primaryColor: "#ffffff",
        defaultColor: darkModeEnabled ? "#f3f4f6" : "#000000",
        defaultHoverColor: SECONDARY_HOVER,
        defaultHoverBorderColor: SECONDARY_HOVER,
        defaultActiveBorderColor: SECONDARY_ACTIVE,
        defaultActiveColor: SECONDARY_ACTIVE,
      },

      Input: {
        activeBorderColor: PRIMARY,
        hoverBorderColor: PRIMARY_HOVER,
        activeShadow: `0 0 0 3px ${darkModeEnabled ? "rgba(0, 18, 89, 0.35)" : PRIMARY_BG}`,
        colorBgContainer: darkModeEnabled ? DARK_BG : "#ffffff",
      },

      Checkbox: {
        colorPrimary: PRIMARY,
        colorPrimaryHover: PRIMARY_HOVER,
        borderRadiusSM: 4,
      },

      Select: {
        controlHeight: 42,
        borderRadius: 10,
        colorBgContainer: darkModeEnabled ? DARK_BG : "#ffffff",
        optionSelectedBg: darkModeEnabled ? "#2f2f2f" : PRIMARY_BG,
        optionSelectedColor: darkModeEnabled ? "#f3f4f6" : PRIMARY,
        optionActiveBg: darkModeEnabled ? "#333333" : SECONDARY_BG,
      },

      Card: {
        borderRadiusLG: 20,
        colorBgContainer: darkModeEnabled ? DARK_BG : "#ffffff",
      },

      Modal: {
        contentBg: darkModeEnabled ? DARK_BG : "#ffffff",
        headerBg: darkModeEnabled ? DARK_BG : "#ffffff",
        footerBg: darkModeEnabled ? DARK_BG : "#ffffff",
      },

      Table: {
        borderRadius: 0,
        borderRadiusLG: 0,
        headerSplitColor: "transparent",
        colorBgContainer: darkModeEnabled ? DARK_BG : "#ffffff",
        colorFillAlter: darkModeEnabled ? "#2a2a2a" : "#fafafa",
      },

      Spin: {
        colorPrimary: PRIMARY,
      },
    },
  };
};

export default getAntdTheme;