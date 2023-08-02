import React from "react";
import LoginComponent from "../components/login";
import Wrapper from '../layout/wrapper';
import SEO from "../common/seo";
const LoginPage = () => {

    return (
        <Wrapper>
            <SEO pageTitle={"SVent - Smart Home Vents"} />
            <LoginComponent />
        </Wrapper>
    )
}

export default LoginPage;