import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Lab from "@/components/sections/Lab";
import Contact from "@/components/sections/Contact";

import Preloader from "@/components/ui/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navigation />
      <main>
        <Hero />
        <Work />
        <About />
        <Lab />
        <Contact />
      </main>
    </>
  );
}
