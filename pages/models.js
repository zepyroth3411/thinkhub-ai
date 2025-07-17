<<<<<<< HEAD
"use client";

import DockNavbar from "@/components/DockNavbar";
import dockItems from "@/config/dockItems";
import Aurora from "@/components/Aurora";

export default function Models() {
  return (
<main className="text-white overflow-x-hidden px-4 flex flex-col min-h-screen">
  <Aurora
    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
    blend={1.0}
    amplitude={1.0}
    speed={0.5}
  />

  <div className="flex-grow">
    {/* Hero Section */}
    <section className="py-16 text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">AI Models</h1>
      <p className="text-lg">
        Explore our collection of interactive AI models and see their real-world impact.
      </p>
    </section>

    {/* Models Grid */}
    <section className="py-8 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
      {/* Cards aquí */}
    </section>
  </div>

  {/* Footer */}
  <footer className="py-4 text-center text-sm text-gray-400">
    © 2025 ThinkHubAI. All rights reserved.
  </footer>

  <DockNavbar items={dockItems} />
</main>

=======
import ThinkHubEmotionModelCard from "@/components/ThinkHubEmotionModelCard";

export default function ModelsPage() {
  return (
    <div className="p-4">
      <ThinkHubEmotionModelCard />
    </div>
>>>>>>> 9c47d487bcfcc8b035d681b350b034c08afd1564
  );
}
