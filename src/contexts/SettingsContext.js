import { createContext } from "react";
import { defaultSettings } from "../config";
import useLocaleStorage from "../hooks/useLocaleStorage";

const initialState = {
  ...defaultSettings,

  onToggleMode: () => {},
};

const SettingContext = createContext(initialState);

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocaleStorage("settings", {
    themeMode: initialState.themeMode,
  });
  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  return (
    <SettingContext.Provider
      value={{
        ...settings,
        onToggleMode,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingContext;

export { SettingsProvider };
