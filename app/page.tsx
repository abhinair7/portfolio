import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { TailorEngine } from "@/components/TailorEngine";
import { ScrollFX } from "@/components/ScrollFX";
import { TailorProvider } from "@/components/TailorContext";
import { profile } from "@/lib/content";

export default function Home() {
  return (
    <TailorProvider>
      <ScrollFX />
      <Nav />
      <main>
        <Hero />
        <Journey />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <TailorEngine />
      </main>
      <Contact />
      <footer className="footer">
        <div className="footer-in">
          <p>© 2026 {profile.name}</p>
          <p>Designed &amp; built in Boston, MA</p>
        </div>
      </footer>
    </TailorProvider>
  );
}
