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
    href: "/",
  },
  {
    icon: <VscArchive size={18} />,
    label: "About",
    href: "/about",
  },
  {
    icon: <VscAccount size={18} />,
    label: "Models",
    href: "/models",
  },
];

export default dockItems;
