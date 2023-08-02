import Header from "@/src/layout/headers/header";
import React from "react";
import SliderArea from "./slider-area";
import AboutArea from "./about-area";
import ServiceArea from "./service-area";
import TestimonialArea from "./testimonial-area";
import FeatureArea from "./feature-area";
import TeamArea from "./team-area";
import VideoArea from "./video-area";
import TopFooter from "./top-footer";
import Footer from "@/src/layout/footers/footer";

const Home = () => {
  return (
    <>
      <Header />
      <SliderArea />
      <AboutArea />
      <ServiceArea />
      <TestimonialArea />
      <FeatureArea />
      <TeamArea />
      <VideoArea />

      <TopFooter />
      <Footer />
    </>
  );
};

export default Home;
