import { useContext } from "react";
import SettingContext from "../contexts/SettingsContext";

const useSettings = () => {
  return useContext(SettingContext);
};

export default useSettings;
