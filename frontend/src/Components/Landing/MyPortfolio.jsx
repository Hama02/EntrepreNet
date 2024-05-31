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

    const maxCount = {
      totalInvestors: counters.totalInvestors,
      totalEntrepreneurs: counters.totalEntrepreneurs,
      nbOfPosts: counters.nbOfPosts,
    };

    const intervals = {
      totalInvestors: 10000000000000000,
      totalEntrepreneurs: 100000000000,
      nbOfPosts: 100000000,
    };

    const incrementCount = (counterKey) => {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [counterKey]:
          prevCounters[counterKey] < maxCount[counterKey]
            ? prevCounters[counterKey] + 1
            : maxCount[counterKey],
      }));
    };

    const startCounter = (counterKey) => {
      return setInterval(() => {
        incrementCount(counterKey);
      }, intervals[counterKey]);
    };

    const countersInterval = {
      totalInvestors: null,
      totalEntrepreneurs: null,
      nbOfPosts: null,
    };

    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const counterKey = entry.target.dataset.counter;
        if (entry.isIntersecting) {
          if (!countersInterval[counterKey]) {
            countersInterval[counterKey] = startCounter(counterKey);
          }
        } else {
          clearInterval(countersInterval[counterKey]);
          countersInterval[counterKey] = null;
          setCounters((prevCounters) => ({
            ...prevCounters,
            [counterKey]: 0, // Mise à zéro lorsque la section n'est pas visible
          }));
        }
      });
    }, options);

    Object.values(sectionsRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionsRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      // Nettoyer les intervalles restants
      Object.values(countersInterval).forEach((interval) => {
        if (interval) {
          clearInterval(interval);
        }
      });
    };
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
