import ProfileCard from "@/components/ProfileCard";
import DockNavbar from "@/components/DockNavbar";
import dockItems from "@/config/dockItems";
import teamProfiles from "@/config/teamProfiles";
import Aurora from "@/components/Aurora";

export default function About() {
  return (
    <main className="text-white overflow-x-hidden px-4">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={1.0}
        amplitude={1.0}
        speed={0.5}
      />
      {/* Hero Section */}
      <section className="py-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About ThinkHubAI</h1>
        <p className="italic text-lg mb-8">
          “AI is only as powerful as the minds that use it.”
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="py-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
        <p className="mb-8 text-center">
          Our mission at ThinkHubAI is to demonstrate the capabilities of small
          AI models, showcasing how even minimal changes can significantly
          impact their behavior and encouraging conscious and ethical use of
          these tools.
        </p>

        <h2 className="text-3xl font-bold mb-4 text-center">Our Vision</h2>
        <p className="text-center">
          Our vision is to bridge the gap between theoretical learning and
          practical AI, by leveraging Python-based models to illustrate how
          simple scripts can evolve into powerful tools that shape how we
          interact with technology.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
        {teamProfiles.map((profile, idx) => (
          <ProfileCard key={idx} {...profile} />
        ))}
      </section>

      {/* Values Section */}
      <section className="py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Conscious AI Use</h3>
            <p className="text-sm">Promoting awareness in how AI is applied.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Educational Impact</h3>
            <p className="text-sm">Making AI accessible and understandable.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Practical Innovation</h3>
            <p className="text-sm">
              Showing real-world applications with minimal resources.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-sm">
              Demystifying the inner workings of AI models.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-400">
        © 2025 ThinkHubAI. All rights reserved.
      </footer>

      {/* Dock navbar */}
      <DockNavbar items={dockItems} />
    </main>
  );
}
