import {useCurrentUser} from "../lib/store.js";
import useTheme from "../hooks/useTheme.js";
import useLocalStorage from "use-local-storage";
import {useMediaQuery} from "react-responsive";
import {useEffect} from "react";
import ThemeSwitcher from "../components/ThemeSwitcher.jsx";
import {defaultThemeConfig} from "../config/theme.config.js";

export default function ThemeProvider({ children }) {
  const { currentUser } = useCurrentUser();

  const { userId } = currentUser || {};
  const [theme, setTheme] = useTheme();
  const [themeLS] = useLocalStorage("groove-theme-config", defaultThemeConfig);

  const isMobile = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  useEffect(() => {
    setTheme({ ...theme, ...themeLS, isMobile: !isMobile });
  }, [isMobile, userId]);

  if (!theme?.color) {
    return <>Loading..</>;
  }

  return (
     <div className="app_container">
       {children}
       {theme && <ThemeSwitcher />}
     </div>
  );
}