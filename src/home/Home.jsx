import React from "react";
import HeroSection from "../components/HeroSection"
import TrustedCompanies from "../components/TrustedCompanies"
import CTA from "../components/CTA"
import FAQ from "../components/FAQ";

export const Home = () => (
  <div>
      <HeroSection/>
      <CTA/>
      <FAQ/>
      <TrustedCompanies/>
  </div>
);