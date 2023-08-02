import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavMenu from './nav-menu';
import Sidebar from './sidebar';
// import Sidebar from './sidebar';

const Header = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [isHide, setIsHide] = useState(false)
   const [isToggleSearch, setToggleSearch] = useState(false);

   const offerHadle = () => {
      setIsHide(true)
   }

   return (
      <>
         <header>
            <div className={`toast show align-items-center border-0 p-relative ${isHide ? "d-none" : ""}`} role="alert" aria-live="assertive" aria-atomic="true">
               <div className="d-flexs">

                  <button
                     onClick={offerHadle}
                     type="button"
                     className="btn-close btn-close-white me-2 m-auto"
                     data-bs-dismiss="toast" aria-label="Close">

                  </button>
               </div>
            </div>

            <div className="header-area header-1-space pl-60 pr-60">
               <div className="container-fluid">
                  <div className="row align-items-center">
                     <div className="col-xl-2 col-lg-6 col-md-5 col-7">
                        <div className="logo">
                           <Link href="/"><img src="/assets/img/logo/logo.png" alt="logo" /></Link>
                        </div>
                     </div>
                     <div className="col-xl-7 d-none d-xl-block text-end">
                        <div className="tp-main-menu text-center">
                           <nav id="mobile-menu">
                              <NavMenu />
                           </nav>
                        </div>
                     </div>
                     <div className="col-xl-3 col-lg-6 col-md-7 col-5">
                        <div className="search-main p-relative">
                           <div className="tp-header-right">


                              <Link href="/contact" className="tp-btn-2 ml-20 d-none d-md-inline-block">Get In Touch</Link>
                              <button onClick={() => setIsOpen(true)} className="tp-menu-toggle tp-header-icon ml-20 d-xl-none">
                                 <i className="far fa-bars"></i>
                              </button>
                           </div>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
   );
};

export default Header;