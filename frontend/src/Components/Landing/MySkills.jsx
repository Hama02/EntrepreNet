import { useEffect } from "react";
import AOS from "aos";
import data from "../../Data/index.json";

export default function MySkills() {
  useEffect(() => {
    AOS.init({
      duration: 4000, // duration of the animation
    });
  }, []);

  return (
    <section className="skills--section" id="mySkills">
      <div className="portfolio--container">
        <h2 className="skills--section--heading" data-aos="fade-up">
          Features
        </h2>
      </div>
      <div className="skills--section--container">
        {data?.skills?.map((item, index) => (
          <div
            key={index}
            className="skills--section--card"
            data-aos="flip-left"
            data-aos-delay={index * 100}
          >
            <div className="skills--section--img">
              <img src={item.src} alt="Product Chain" />
            </div>
            <div className="skills--section--card--content">
              <h3 className="skills--section--title">{item.title}</h3>
              <p className="skills--section--description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
