import AboutMe from "./Components/Landing/AboutMe";
import ContactMe from "./Components/Landing/ContactMe";
import Navbar from "./Components/Landing/Navbar";
import Footer from "./Components/Landing/Footer";
import HeroSection from "./Components/Landing/HeroSection";
import MyPortfolio from "./Components/Landing/MyPortfolio";
import MySkills from "./Components/Landing/MySkills";
import Testimonial from "./Components/Landing/Testimonials";
import "./index.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MySkills />
      <AboutMe />
      <MyPortfolio />
      <Testimonial />
      <ContactMe />
      <Footer />
    </>
  );
}
