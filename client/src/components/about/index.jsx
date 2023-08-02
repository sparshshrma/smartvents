import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import Header from "@/src/layout/headers/header";
import React from "react";
import AboutArea from "./about-area";
import ServiceArea from "./service-area";
import FeatureArea from "./feature-area";
import Footer from "@/src/layout/footers/footer";

const About = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="About" innertitle="About Us" />
      <AboutArea />
      <ServiceArea />
      <FeatureArea />
      <Footer />
    </>
  );
};

export default About; 
