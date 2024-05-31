import { useEffect, useState, useRef } from "react";
import "./style.css";

export default function MyPortfolio() {
  const [counters, setCounters] = useState({
    totalInvestors: 0,
    totalEntrepreneurs: 0,
    nbOfPosts: 0,
  });

  const sectionsRefs = {
    totalInvestors: useRef(null),
    totalEntrepreneurs: useRef(null),
    nbOfPosts: useRef(null),
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/stats/get-stats"
        );
        const data = await response.json();
        setCounters({
          totalInvestors: data.totalInvestors,
          totalEntrepreneurs: data.totalEntrepreneurs,
          nbOfPosts: data.nbOfPosts,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="portfolio--section" id="MyPortfolio">
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <h1 className="section--heading">Statistics</h1>
        </div>
      </div>
      <div className="wrapper">
        <div
          className="cont"
          ref={sectionsRefs.totalInvestors}
          data-counter="totalInvestors"
        >
          <i className="fas fa-utensils"></i>
          <span className="num">{counters.totalInvestors}</span>
          <span className="text">Total Investors</span>
        </div>
        <div
          className="cont"
          ref={sectionsRefs.totalEntrepreneurs}
          data-counter="totalEntrepreneurs"
        >
          <i className="fas fa-smile-beam"></i>
          <span className="num">{counters.totalEntrepreneurs}</span>
          <span className="text">Total Entrepreneurs</span>
        </div>
        <div
          className="cont"
          ref={sectionsRefs.nbOfPosts}
          data-counter="nbOfPosts"
        >
          <i className="fas fa-list"></i>
          <span className="num">{counters.nbOfPosts}</span>
          <span className="text">Number of posts</span>
        </div>
      </div>
    </section>
  );
}
