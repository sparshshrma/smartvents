import Link from "next/link";
import React, {useState} from 'react';
import Header from "../../layout/headers/header";
import Footer from "../../layout/footers/footer";
import axios from "axios";
import {useRouter} from "next/router";

const RegisterComponent = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    try {
      console.log(email, password);
      axios
        .post("http://localhost:4000/user", {
          username: username,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then(
          async (response) => {
            console.log(response);
            if (response.data === "user Created") {
              router.push("/login");
            } else {
              setErrorMessage({
                name: "user",
                message: response.data,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.error("Error occurred while fetching user data:", error);
      setErrorMessage({name: "login", message: "Internal server error"});
    }
  };

  return (
    <>
      <Header/>
      <section className="container">
        <form id="register-form" style={{paddingTop: '100px', paddingBottom: '100px'}}>
          <div className="row"
               style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <h3 className="text-center">Register</h3>
              {errorMessage && <div>{errorMessage.message}</div>}
              <div className="contact__input">
                <i className="fas fa-user"></i>
                <input className="w-100" type="text" placeholder="Username" value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       name="username" required/>
              </div>
              <div className="contact__input">
                <i className="fas fa-user"></i>
                <input className="w-100" type="text" onChange={(e) => setFirstName(e.target.value)}
                       placeholder="First Name" name="firsttName" required/>
              </div>

              <div className="contact__input">
                <i className="fas fa-user"></i>
                <input className="w-100" onChange={(e) => setLastName(e.target.value)} type="text"
                       placeholder="Last Name" name="lastName"/>
              </div>
              <div className="contact__input">
                <i className="fas fa-envelope"></i>
                <input className="w-100" onChange={(e) => setEmail(e.target.value)} type="text"
                       placeholder="Email address" name="email"/>
              </div>
              <div className="contact__input">
                <i className="fas fa-key"></i>
                <input onChange={(e) => setPassword(e.target.value)} className="w-100" type="password"
                       placeholder="Enter password" name="password"/>
              </div>
              <div className="contact__btn">
                <button className="tp-btn w-100" onClick={handleSubmit} type="button">Submit <i
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

      <Footer/>
    </>

  )
}

export default RegisterComponent;