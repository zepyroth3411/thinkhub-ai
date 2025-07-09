import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";

const dockItems = [
  {
    icon: <VscHome size={18} />,
    label: "Home",
    onClick: () =>
      document.getElementById("home").scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: <VscArchive size={18} />,
    label: "About",
    onClick: () =>
      document.getElementById("about").scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: <VscAccount size={18} />,
    label: "Models",
    onClick: () =>
      document
        .getElementById("modelsAI")
        .scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: <VscSettingsGear size={18} />,
    label: "Settings",
    onClick: () => alert("Settings!"),
  },
];

export default dockItems;
