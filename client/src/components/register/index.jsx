import Link from "next/link";
import React, { useState } from 'react';
import Header from "../../layout/headers/header";
import Footer from "../../layout/footers/footer";

const RegisterComponent = () => {


    return (
        <>
            <Header />
            <section className="container">
                <form id="login-form" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
                    <div className="row" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                            <h3 className="text-center">Register</h3>
                            <div className="contact__input">
                                <i className="fas fa-user"></i>
                                <input className="w-100" type="text" placeholder="Username" name="username" required />
                            </div>
                            <div className="contact__input">
                                <i className="fas fa-user"></i>
                                <input className="w-100" type="text" placeholder="First Name" name="firsttName" required />
                            </div>

                            <div className="contact__input">
                                <i className="fas fa-user"></i>
                                <input className="w-100" type="text" placeholder="Last Name" name="lastName" />
                            </div>
                            <div className="contact__input">
                                <i className="fas fa-envelope"></i>
                                <input className="w-100" type="text" placeholder="Email address" name="email" />
                            </div>
                            <div className="contact__input">
                                <i className="fas fa-key"></i>
                                <input className="w-100" type="password" placeholder="Enter password" name="password" />
                            </div>
                            <div className="contact__btn">
                                <button className="tp-btn w-100" type="button">Submit <i
                                    className="fal fa-long-arrow-right"></i></button>
                            </div>
                        </div>
                        <Link href="/login">
                            <p className="text-center" style={{
                                marginTop: '10px',
                                fontWeight: 600,
                                fontFamily: 'Space Grotesk',
                                cursor: 'pointer'
                            }}>Have an account? Login</p>
                        </Link>
                    </div>
                </form>
            </section>

            <Footer />
        </>

    )
}

export default RegisterComponent;