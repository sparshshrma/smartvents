import Link from "next/link";
import React from "react";
import Footer from "../layout/footers/footer";
import SEO from "../common/seo";
import Header from "../layout/headers/header";

const index = () => {
  return (
    <>
      <SEO pageTitle={"Oops.! Page Not Found!"} />
      <Header />
      <div id="smooth-wrapper error_page">
        <div id="smooth-content">
          <main>
            <div className="tp-error-area tp-error-ptb p-relative">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tp-error-content-box text-center mb-40">
                      <img src="/assets/img/text-404.png" alt="theme-pure" />
                    </div>
                    <div className="tp-error-text-box text-center">
                      <h4 className="error-title-sm">Oops.! Page Not Found!</h4>
                      <p>The page vou are looking for does not exist'</p>
                      {/* <Link
                        className="eroor_btn tp-btn-inner tp-btn-hover alt-color-black mb-10"
                        href="/"
                      >
                        <span> Back To Home</span>
                        <b></b>
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;
