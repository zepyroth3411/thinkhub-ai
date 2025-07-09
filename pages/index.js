import { useState, useEffect } from "react";
import Aurora from "@/components/Aurora";
import Dock from "@/components/Dock";
import ButtonGlass from "@/components/ButtonGlass";
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
  VscGraph,
  VscDatabase,
  VscEye,
} from "react-icons/vsc";

const items = [
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

export default function Home() {
  const [dockVisible, setDockVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      const verticalThreshold = screenHeight * 0.7;
      const horizontalMin = screenWidth * 0.3;
      const horizontalMax = screenWidth * 0.7;

      if (
        clientY > verticalThreshold &&
        clientX > horizontalMin &&
        clientX < horizontalMax
      ) {
        setDockVisible(true);
      } else {
        setDockVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="text-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden text-center px-4"
      >
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-40"></div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">ThinkHubAI</h1>
          <h2 className="text-xl mb-4">
            Empowering AI Understanding for Conscious Use
          </h2>
          <p className="mb-6">
            Discover how models evolve, change, and impact our daily decisions
            through interactive demonstrations.
          </p>
          <ButtonGlass onClick={() => console.log("Clicked!")}>
            Explore Models
          </ButtonGlass>
        </div>
      </section>

      {/* About Section with highlights */}
      <section id="about" className="py-16 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">About ThinkHubAI</h2>
        <p className="mb-12">
          ThinkHubAI is a platform created to demystify AI models for everyone,
          raising awareness about their use and limitations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <VscGraph className="mx-auto mb-2" size={32} />
            <h3 className="text-lg font-semibold mb-1">Interactive Learning</h3>
            <p className="text-sm">
              Engage with live models to see how AI learns and adapts.
            </p>
          </div>

          <div>
            <VscDatabase className="mx-auto mb-2" size={32} />
            <h3 className="text-lg font-semibold mb-1">Real Datasets</h3>
            <p className="text-sm">
              Explore models trained on practical, real-world data.
            </p>
          </div>

          <div>
            <VscEye className="mx-auto mb-2" size={32} />
            <h3 className="text-lg font-semibold mb-1">Model Insights</h3>
            <p className="text-sm">
              Understand model outputs, accuracy, and performance metrics.
            </p>
          </div>
        </div>
      </section>

      {/* AI Models Section */}
      <section id="modelsAI" className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">AI Models</h2>
        <p className="mb-12 text-center max-w-2xl mx-auto">
          Explore our AI models designed to demonstrate various tasks such as
          classification, prediction, and detection.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">
              Emotion Classification
            </h3>
            <p className="mb-4">Dataset: emotions.csv</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Try it
            </button>
          </div>

          <div className="border border-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Spam Detector</h3>
            <p className="mb-4">Dataset: spam.csv</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Try it
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-400">
        © 2025 ThinkHubAI. All rights reserved.
      </footer>

      {/* Dock navbar */}
      <div
        className={`fixed bottom-0 left-0 w-full z-20 transition-all duration-500 ease-in-out ${
          dockVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </main>
  );
}
