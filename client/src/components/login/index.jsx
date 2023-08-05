import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../layout/headers/header";
import Footer from "../../layout/footers/footer";





const LoginComponent = () => {

    const [errorMessage, setErrorMessage] = useState({});
    // const [isSubmitted, setSubmitted] = useState(false);
    // const { errorMessage, isSubmitted } = useLogin();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        console.log(email, password);
        axios
          .post("https://smart-vents-api.onrender.com/login", {
            email: email,
            password: password,
          })
          .then(
            async (response) => {
              console.log(response.data);
  
              if (response.data.message === "logged in") {
                await localStorage.setItem(
                  "token",
                  JSON.stringify(response.data)
                );
                router.push("/dashboard");
              } else {
                setErrorMessage({
                  name: "login",
                  message: "Invalid Credentails",
                });
              }
            },
            (error) => {
              console.log(error);
            }
          );
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
        setErrorMessage({ name: "login", message: "Internal server error" });
      }
    };

    return (
        <>
            <Header />
            <section className="container">
                <form onSubmit={handleSubmit} id="login-form" style={{ paddingTop: '100px', paddingBottom: '100px' }} >
                {errorMessage && <div>{errorMessage.message}</div>}
                    <div className="row" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                            <h3 className="text-center">Login into account</h3>
                            <div className="contact__input">
                                <i className="fas fa-envelope"></i>
                                <input className="w-100" type="text" placeholder="Email address" name="email"  required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="contact__input">
                                <i className="fas fa-key"></i>
                                <input className="w-100" type="password" placeholder="Enter password" name="password" required  onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="contact__btn">
                                <button className="tp-btn w-100" type="submit">Submit <i
                                    className="fal fa-long-arrow-right"></i></button>
                            </div>
                        </div>
                        <Link href="/register">
                            <p className="text-center" style={{
                                marginTop: '10px',
                                fontWeight: 600,
                                fontFamily: 'Space Grotesk',
                                cursor: 'pointer'
                            }}>Don't have an account? Register</p>
                        </Link>
                    </div>
                </form>
            </section>

            <Footer />
        </>

    )
}

export default LoginComponent;