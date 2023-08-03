import Link from 'next/link';
import React from 'react';



const service_content = {
   service_data: [
      {
         id: 1,
         tab_id: "nav-camera",
         active: "show active",
         aria_labelledby: "nav-camera-tab",
         img: "/assets/img/services/service1.jpg",
         price: "59",
         title: "Get your installation done",
         description: <> Smart vent services provide a technician that will come and install the smart vents professionally in the right place. He will also be taking care of zoning, perfect angle and will also guide you through the app.</>,
         fetures: [
            "Departure of the expert",
            "Configure software",
            "24/7 Support",
            "Perfect Zoning",
            "Special applicationt",
         ]
      },
      {
         id: 2,
         tab_id: "nav-cctv",
         active: "",
         aria_labelledby: "nav-cctv-tab",
         img: "/assets/img/services/service2.jpg",
         price: "35",
         title: "Firmware Updates and Support: ",
         description: <>Smart vents application comes with diffenet plans and prices. The most basic one is for residential and small buildings that will give you all these features</>,
         fetures: [
            "Access to software",
            "24/7 Support",
            "Scheduling your vents",
            "Multi user support",
         ]
      },
      {
         id: 3,
         tab_id: "nav-security",
         active: "",
         aria_labelledby: "nav-security-tab",
         img: "/assets/img/services/service3.jpg",
         price: "45",
         title: "We got Technician",
         description: <> Smart vent services are also available for big building with more than 4 floors in which we provide our best trained technician to keep your vent up and running all the time.</>,
         fetures: [
            "Access to software",
            "24/7 Support",
            "Scheduling your vents",
            "Multi user support",
            "On-Site Technician",
         ]
      },
   ]
}
const { service_data } = service_content


const ServiceArea = () => {
   return (
      <>
         <div className="service-area">
            <div className="service-tab-bg pt-115" style={{ backgroundImage: `url(/assets/img/services/tab-bg.jpg)` }}>
               <div className="container">
                  <div className="tp-section-box tp-section-box-2 p-relative mb-45 text-center">
                     <span className="tp-section-subtitle d-inline-block pre mb-10">services</span>
                     <h2 className="tp-section-title">
                        What We Provide
                     </h2>
                  </div>
                  <div className="service-tab-info">
                     <nav>
                        <div className="nav tp-service-tab justify-content-center mb-35" id="nav-tab" role="tablist">
                           <button className="nav-links active" id="nav-camera-tab" data-bs-toggle="tab" data-bs-target="#nav-camera"
                              type="button" role="tab" aria-controls="nav-camera" aria-selected="false">Installation</button>

                           <button className="nav-links" id="nav-cctv-tab" data-bs-toggle="tab" data-bs-target="#nav-cctv"
                              type="button" role="tab" aria-controls="nav-cctv" aria-selected="false">App plans and benefits</button>

                           <button className="nav-links" id="nav-security-tab" data-bs-toggle="tab" data-bs-target="#nav-security"
                              type="button" role="tab" aria-controls="nav-security" aria-selected="false">On-site Technician</button>
                        </div>
                     </nav>
                     <div className="tab-content" id="nav-tabContent">
                        {service_data.map((item, i) =>
                           <div key={i} className={`tab-pane fade ${item.active}`} id={item.tab_id} role="tabpanel" aria-labelledby={item.aria_labelledby}
                              tabIndex="0">
                              <div className="slider-tab-main white-bg">
                                 <div className="row">
                                    <div className="col-lg-5 col-12 sv-tab-img">
                                       <div className="tp-service-tab-img">
                                          <img src={item.img} alt="theme-pure" />
                                       </div>
                                    </div>
                                    <div className="col-lg-7 col-12 sv-tab-content">
                                       <div className="tp-service-tab-content pt-30 pl-25">
                                          <div className="tab-circle">
                                             <h4><span>$</span>{item.price}</h4>
                                             <h3 className="sv-tab-titile">{item.title}</h3>
                                             <p>{item.description}</p>
                                          </div>
                                          <div className="tp-sv-feature-list mb-40">
                                             <ul>
                                                {item.fetures.map((feture, index) =>
                                                   <li key={index}><i className="fal fa-check"></i>{feture}</li>
                                                )}
                                             </ul>
                                          </div>
                                          <div className="services-tab-btn">
                                             <Link href="#" className="tp-btn">Read More</Link>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )}

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ServiceArea;