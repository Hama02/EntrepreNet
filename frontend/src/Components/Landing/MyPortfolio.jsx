import { useEffect, useState, useRef } from "react";
import "./style.css";

export default function MyPortfolio() {
  const [counters, setCounters] = useState({
    mealsDelivered: 0,
    projectSuccessRate: 0,
    userSatisfaction: 0,
    newProjects: 0,
  });

  const sectionsRefs = {
    mealsDelivered: useRef(null),
    projectSuccessRate: useRef(null),
    userSatisfaction: useRef(null),
    newProjects: useRef(null),
  };

  useEffect(() => {
    const maxCount = {
      mealsDelivered: 300,
      projectSuccessRate: 70,
      userSatisfaction: 80,
      newProjects: 200,
    };

    const intervals = {
      mealsDelivered: 25,
      projectSuccessRate: 50,
      userSatisfaction: 40,
      newProjects: 30,
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
      mealsDelivered: null,
      projectSuccessRate: null,
      userSatisfaction: null,
      newProjects: null,
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
          ref={sectionsRefs.mealsDelivered}
          data-counter="mealsDelivered"
        >
          <i className="fas fa-utensils"></i>
          <span className="num">{counters.mealsDelivered}K</span>
          <span className="text">Total Users</span>
        </div>
        <div
          className="cont"
          ref={sectionsRefs.projectSuccessRate}
          data-counter="projectSuccessRate"
        >
          <i className="fas fa-smile-beam"></i>
          <span className="num">{counters.projectSuccessRate}%</span>
          <span className="text">Success Rate</span>
        </div>
        <div
          className="cont"
          ref={sectionsRefs.userSatisfaction}
          data-counter="userSatisfaction"
        >
          <i className="fas fa-list"></i>
          <span className="num">{counters.userSatisfaction}%</span>
          <span className="text">User Satisfaction</span>
        </div>
        <div
          className="cont"
          ref={sectionsRefs.newProjects}
          data-counter="newProjects"
        >
          <i className="fas fa-star"></i>
          <span className="num">{counters.newProjects}</span>
          <span className="text">New Projects/Month</span>
        </div>
      </div>
    </section>
  );
}
