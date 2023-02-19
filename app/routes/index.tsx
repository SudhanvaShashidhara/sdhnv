import { Link } from "@remix-run/react";

import HomePageHeroSection from "../components/HomePageHeroSection";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "sdhnv - Home Page",
    description: "Home Page",
  };
};

export default function Index() {
  return (
    <div className="p-5">
      <h1 className="text-4xl text-center">SDHNV</h1>
      <hr />
      <Link to="/contact/">Contact Page</Link>
      <hr />
      <HomePageHeroSection />
    </div>
  );
}
