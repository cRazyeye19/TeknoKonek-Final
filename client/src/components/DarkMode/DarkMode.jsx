import { useState, useEffect } from "react";
import "./DarkMode.css";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("selectedTheme") || "light"
  );

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
    setTheme("dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
    setTheme("light");
  };

  useEffect(() => {
    if (theme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") setLightMode();
    else setDarkMode();
  };
  return (
    <div className="option" onClick={toggleTheme}>
      {theme === "dark" ? <DarkModeOutlinedIcon style={{ color: "var(--textColor)" }} /> : <LightModeOutlinedIcon />}
    </div>
  );
};

export default DarkMode;
