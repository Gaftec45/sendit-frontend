import React from "react";
// import Navbar from '../Navbar';
import Footer from '../component/Partials/Footer';
import IG from '../assets/img/delv.jpg';
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

function PublicPage() {
  return (
    <>
      <div id="maincontent">
          <header className="content">
              <h1>sendIT Company Is Here</h1>
              <p>
                  If you're looking for the best platform for your package to be shipped to any destination of your choice, we're here to serve the best quality, reliable service you've never experienced before...<br />
                  <span>Click the button below to sign up</span>
              </p>
              {/* Use NavLink for navigation */}
              <NavLink to="/signup" className="btn">Create Account</NavLink>
              <NavLink to="/login" className="btn">Login</NavLink>
          </header>
      </div>
      <section id="des">
          <div className="aboutC">
              <h2>About Us</h2>
              <p>
                  Quickly incentivize impactful action items before tactical collaboration and idea-sharing. Monotonically engage market-driven intellectual capital through wireless opportunities. Progressively network performance-based services for functionalized testing procedures.
              </p>
              <button>Learn More</button>
          </div>
          <div className="aboutP">
              <img src={IG} alt="About sendIT" />
          </div>
      </section>
      <Footer />
    </>
  );
}

export default PublicPage;
