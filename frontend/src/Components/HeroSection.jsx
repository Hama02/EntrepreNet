export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">EntrepreNet :</p>
          <h1 className="hero--section--title">
            <span className="hero--section-title--color">WHERE DEALS</span>{" "}
            <br />
            GET DONE
          </h1>
          <p className="hero--section-description">
            Connecting entrepreneurs & investors.
            <br /> Building the future, one deal at a time !
          </p>
        </div>
        <button className="btn btn-primary">Begin Your Journey Here</button>
      </div>
      <div className="hero--section--img">
        <img src="./img/img7.png" alt="Hero Section" />
      </div>
    </section>
  );
}
