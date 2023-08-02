import React from "react";
import Wrapper from "../layout/wrapper";
import SEO from "../common/seo";
import Install from "../components/install";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"SVent - Smart Home Vents"} />
      <Install />
    </Wrapper>
  );
};

export default index;
