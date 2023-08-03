import Link from 'next/link';
import React from 'react';


const feature_data = [
    {
        id: 2,
        icon: "flaticon-secure",
        title: "Precise data"
    },
    {
        id: 3,
        icon: "flaticon-global",
        title: "Fast App connectivity"
    },
    {
        id: 4,
        icon: "flaticon-database",
        title: "Fully professional website"
    },
]

const FeatureArea = () => {
    return (
        <>
            <div className="feature-third-area feature-bg-img pt-110 pb-110" style={{ backgroundImage: `url(/assets/img/feature/serv-bg.jpg)` }}>
                <div className="container">
                    <div className="row justify-content-lg-end">
                        <div className="col-xxl-6 col-xl-7 col-lg-8">
                            <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                                <span className="tp-section-subtitle d-inline-block right mb-10">features</span>
                                <h2 className="tp-section-title">
                                    Motion and Occupancy Detection
                                </h2>
                            </div>
                            <div className="row">
                                {feature_data.map((item, i) =>
                                    <div key={i} className="col-lg-6 col-md-6">
                                        <div className="fea-list d-flex align-items-center mb-30">
                                            <i className={item.icon}></i>
                                            <div className="fea-ctn pl-20">
                                                <h5 className="m-0">{item.title}</h5>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="fea-button pt-20">
                                    <Link className="tp-btn mr-25" href="/contact">Get In Touch <i className="fal fa-long-arrow-right"></i></Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeatureArea;