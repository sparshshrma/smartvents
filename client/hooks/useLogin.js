import { useState } from "react";
import axios from "axios";

const useLogin = () => {
 // const [isSubmitted, setSubmitted] = useState(false);

  const login = async (email, password) => {
    try {
      console.log(username, password);
      axios.post('http://localhost:4000/login',{
        email: username,
        password: username
      }).then((response)=>{
        console.log(response.data.body.token);
        if (message === "logged in") {
          useLogin();
          localStorage.setItem('token', response.data);
            router.push("/dashboard");
        } else {
          //setErrorMessage({ name: "login", message: message });
        }
      }, (error) =>{
        console.log(error);
      });
      }
    catch (error) {
    setErrorMessage({ name: "login", message: message });
    console.error("Error occurred while logging in:", error);
    setErrorMessage("Internal server error");
    }
  };

  return { login };
};

export default useLogin;

