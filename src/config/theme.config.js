export const themeConfig = {
  modes: ["light", "dark"],
  colors: {
    pink: {
      primary: "#fe366e",
      primaryLightGray: "#be123c",
      primaryOpacity: "rgba(237, 33, 93, 0.075)",
    },
    cyan: {
      primary: "#0891b2",
      primaryLightGray: "#107490",
      primaryOpacity: "rgba(16, 116, 144, 0.1)",
    },
    emerald: {
      primary: "#009688",
      primaryLightGray: "#0f766e",
      primaryOpacity: "rgba(0, 150, 136, 0.1)",
    },
    purple: {
      primary: "#8c7cf0",
      primaryLightGray: "#0369A1",
      primaryOpacity: "rgba(110, 23, 203, 0.1)",
    },
    amber: {
      primary: "#c77e23",
      primaryLightGray: "#965e19",
      primaryOpacity: "rgba(199, 126, 35, 0.1)",
    },
  },
  themes: {
    theme_light: {
      neutralBg: "#eef2f6",
      neutralBgOpacity: "rgba(255, 255, 255, 0.7)",
      neutralBgAlt: "#ffffff",
      onNeutralBg: "#404040",
      onNeutralBgSecondary: "#737373",
      onNeutralBgDivider: "#e5e5e5",
      switchBg: "#f8fafc",
      cardBg: "#ffffff",
      cardSkeletonBg: "#c9d7e2",
      cardBgHover: "#e5edf5",
      player: "#919191",
    },
    theme_dark_pink: {
      neutralBg: "#17171b",
      neutralBgOpacity: "rgba(23, 23, 27, 0.7)",
      neutralBgAlt: "#111114",
      onNeutralBg: "#ffffff",
      onNeutralBgSecondary: "#a3a3a3",
      onNeutralBgDivider: "#2c2d36",
      switchBg: "#1f1f25",
      cardBg: "#100f0f",
      cardSkeletonBg: "#24242a",
      cardBgHover: "#212124",
      primary: "var(--color-primary)",
      player: "#ffffff",
    },
    theme_dark_cyan: {
      neutralBg: "#1f2937",
      neutralBgOpacity: "rgba(31, 41, 55, 0.7)",
      neutralBgAlt: "#0f1521",
      onNeutralBg: "#ffffff",
      onNeutralBgSecondary: "#a3a3a3",
      onNeutralBgDivider: "#2a2f3d",
      switchBg: "#171c29",
      cardBg: "#111827",
      cardSkeletonBg: "#1b2132",
      cardBgHover: "#374152",
      player: "#ffffff",
    },
    theme_dark_emerald: {
      neutralBg: "#0e1b23",
      neutralBgOpacity: "rgba(14, 27, 35, 0.7)",
      neutralBgAlt: "#010f17",
      onNeutralBg: "#ffffff",
      onNeutralBgSecondary: "#a3a3a3",
      onNeutralBgDivider: "#1c2c35",
      switchBg: "#14252f",
      cardBg: "#14252f",
      cardSkeletonBg: "#1c2c35",
      cardBgHover: "#051114",
      player: "#ffffff",
    },
    theme_dark_purple: {
      neutralBg: "#25262c",
      neutralBgOpacity: "rgba(37, 38, 44, 0.7)",
      neutralBgAlt: "#191b1f",
      onNeutralBg: "#ffffff",
      onNeutralBgSecondary: "#a3a3a3",
      onNeutralBgDivider: "#2c2d36",
      switchBg: "#1f1f24",
      cardBg: "#1f1f24",
      cardSkeletonBg: "#2c2d36",
      cardBgHover: "#2e2f36",
      player: "#ffffff",
    },
    theme_dark_amber: {
      neutralBg: "#363c43",
      neutralBgOpacity: "rgba(48, 54, 60, 0.5)",
      neutralBgAlt: "#30363c",
      onNeutralBg: "#f5f5f5",
      onNeutralBgSecondary: "#d4d4d4",
      onNeutralBgDivider: "#3c4248",
      switchBg: "#2f343a",
      cardBg: "#2a2f34",
      cardSkeletonBg: "#3e454e",
      cardBgHover: "#3c4248",
      player: "#ffffff",
    },
  },
  layouts: ["ltr", "rtl"],
  orientations: ["vertical", "horizontal"],
  players: ["lined", "boxed"],
  fontFamilies: ["fira sans", "roboto", "lato", "inter", "poppins"],
  sidebars: {
    folded: "80",
    full: "200",
  },
};

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const defaultThemeConfig = {
  mode: themeConfig?.modes?.[prefersDark ? 1 : 0],
  layout: themeConfig?.layouts?.[0],
  color: Object.keys(themeConfig?.colors)?.[2],
  sidebar: Object.keys(themeConfig?.sidebars)?.[1],
  orientation: themeConfig?.orientations?.[0],
  fontFamily: themeConfig?.fontFamilies?.[0],
  player: themeConfig?.players?.[0],
  borderRadius: 6,
};
