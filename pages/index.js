import Aurora from "@/components/Aurora";
import Dock from "@/components/Dock";
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";

const items = [
  { icon: <VscHome size={18} />, label: "Home", onClick: () => alert("Home!") },
  {
    icon: <VscArchive size={18} />,
    label: "Archive",
    onClick: () => alert("Archive!"),
  },
  {
    icon: <VscAccount size={18} />,
    label: "Profile",
    onClick: () => alert("Profile!"),
  },
  {
    icon: <VscSettingsGear size={18} />,
    label: "Settings",
    onClick: () => alert("Settings!"),
  },
];

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold">ThinkHubAI</h1>
        <p>Bienvenido a la plataforma de modelos IA</p>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-20">
        <Dock
          items={items}
          panelHeight={45}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </main>
  );
}
