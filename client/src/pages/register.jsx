import React from "react";
import RegisterComponent from "../components/register";
import Wrapper from "../layout/wrapper";
import SEO from "../common/seo";

const RegisterPage = () => {

    return (
        <Wrapper>
            <SEO pageTitle={"SVent - Smart Home Vents"} />
            <RegisterComponent />
        </Wrapper>
    )
}

export default RegisterPage;