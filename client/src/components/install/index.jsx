import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import Footer from "@/src/layout/footers/footer";
import Header from "@/src/layout/headers/header";
import React from "react";
import InstallArea from "./install-area";
import InstallFaq from "./install-faq";

const Install = () => {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title="Installation" innertitle="Installation Process" />
        <InstallArea />
        <InstallFaq />
      </main>
      <Footer />
    </>
  );
};

export default Install;
