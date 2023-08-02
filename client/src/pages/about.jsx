import React from "react";
import Wrapper from "../layout/wrapper";
import SEO from "../common/seo";
import About from "../components/about";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"SVent-Smart Vent Solutions"} />
      <About />
    </Wrapper>
  );
};

export default index;
