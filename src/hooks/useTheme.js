import useLocalStorage from "use-local-storage";
import {useUpdateAccountTheme} from "../lib/actions/profile.action.js";
import {useCurrentUser} from "../lib/store.js";
import {defaultThemeConfig} from "../configs/theme.config.js";


export default function useTheme() {
  const { updateTheme: setTheme } = useUpdateAccountTheme();
    const [themeLS] = useLocalStorage("groove-theme-config");

    const { currentUser } = useCurrentUser();
    const { user } = currentUser || {};
    const theme = themeLS || user?.prefs || defaultThemeConfig;

    return [theme, setTheme];
}
