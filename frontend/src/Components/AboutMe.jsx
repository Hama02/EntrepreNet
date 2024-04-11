/* eslint-disable react/no-unescaped-entities */
export default function AboutMe() {
  return (
    <section id="AboutMe" className="about--section">
      <div className="about--section--img">
        <img src="./img/deal.png" alt="About Me" />
      </div>
      <div className="hero--section--content--box about--section--box">
        <div className="hero--section--content">
          <h1 className="skills-section--heading">About Us</h1>
          <p className="hero--section-description">
            <u>Welcome to EntrepreNet</u> - where connections thrive, ideas
            flourish, and success awaits. We're dedicated to fostering
            meaningful engagements within the entrepreneurial and investment
            community.
          </p>
          <p className="hero--section-description">
            Our mission is simple: to fuel growth, innovation, and success by
            providing the tools and support entrepreneurs and investors need to
            thrive.
            <u>Join us</u> and let's make deals happen and futures bright.
          </p>
        </div>
      </div>
    </section>
  );
}
