import Link from "next/link";
import React from "react";

const about_content = {
  images: [
    { id: 1, cls_1: "ab-1st-img", cls_2: "ab-main-img", img: "/assets/img/about/banner-10.jpg" },
    { id: 2, cls_1: "", cls_2: "ab-sec-img", img: "/assets/img/about/ab-11.jpg" },

  ],
  subtitle: "About Us",
  title: "Why Smart Vent?",
  description: <>Our Vent management system will give you one touch access to your vents. By having this all the data of your vents will be available to your phone with magnificient technology and 24/7 customer support.</>,

  title_1: "RESIDENTIAL",
  title_2: "COMMERCIAL",
  des_1: "Better scheduling and understanding of information of vents of all rooms in your house.",
  des_2: "Easy to manage the vent scheduling of the places hard to reach and getting their information as well.",
  name: "Moustapha Mohammad",
  job_title: "Head Of Idea",

}
const { images, subtitle, title, description, title_1, title_2, des_1, des_2, name, job_title } = about_content


const AboutArea = () => {
  return (
    <>
      <div className="tp-about-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="tp-about-wapper3 mb-30">
                {images.map((item, i) =>
                  <div key={i} className={item.cls_2}>
                    <img
                      className={item.cls_1}
                      src={item.img}
                      alt="theme-pure"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="tp-ab-wrapper-3 pt-55 pl-50 mb-30">
                <div className="tp-section-box tp-section-box-2 mb-40  p-relative">
                  <span className="tp-section-subtitle right d-inline-block">
                    {subtitle}
                  </span>
                  <h2 className="tp-section-title mb-20">
                    {title}
                  </h2>
                  <p className="p-text">{description}</p>
                </div>
                <div className="tp-ab-fe-box mb-40">
                  <div className="about-feature-list d-flex align-items-center mb-20">
                    <div className="about-icon mr-25">
                      <i className="flaticon-web-security"></i>
                    </div>
                    <div className="about-feature-text">
                      <h5 className="m-0 mb-5">{title_1}</h5>
                      <p className="m-0">{des_1}</p>
                    </div>
                  </div>
                  <div className="about-feature-list d-flex align-items-center">
                    <div className="about-icon mr-25">
                      <i className="flaticon-school"></i>
                    </div>
                    <div className="about-feature-text">
                      <h5 className="m-0 mb-5">{title_2}</h5>
                      <p className="m-0">{des_2}</p>
                    </div>
                  </div>
                </div>
                <div className="tp-about-fea-signature d-flex align-items-center">
                  <div className="mr-30 mb-10">
                    <Link className="tp-btn-border" href="/about"> Learn More <i className="fal fa-long-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="about-signature d-flex align-items-center mb-10">
                    <div className="ab-meta-content ml-15">
                      <h6 className="m-0 ab-meta-title">{name}</h6>
                      <span className="ab-meta-subtitle">{job_title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutArea;
