import { useState } from "react";
import axios from "axios";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/daall.png";

function SignUp() {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    email: "",
    role: "Client",
    age: 0,
    firstname: "",
    lastname: "",
    telephone: "",
    city: "",
    sexe: "",
  });
  const [error, setError] = useState(false);

  async function register() {
    try {
      const data = await axios.post("http://localhost:3001/auth/register", {
        username: info.username,
        password: info.password,
        email: info.email,
        type: info.role,
        age: parseInt(info.age),
        firstname: info.firstname,
        lastname: info.lastname,
        telephone: info.telephone,
        city: info.city,
        sexe: info.sexe,
      });
      if (data.data.role === "Client") {
        window.location.href = "/dashboard";
        localStorage.setItem("user", JSON.stringify(data.data.user));
      } else if (data.data.role === "Expert") {
        window.location.href = "/expert/expertDashboard";
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }
    } catch (err) {
      setError(true);
    }
  }

  return (
    <BasicLayout
      title="Create Your Account!"
      description="Use your email and password."
      image={curved6}
    >
      <Card
        sx={{
          width: "130%",
          m: -5,
          my: 0,
          px: 0,
          p: 1,
        }}
      >
        <SoftBox p={2} mb={0} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={0}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={2} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={info.email}
                onChange={(e) => {
                  setInfo({ ...info, email: e.target.value });
                }}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Username"
                value={info.username}
                onChange={(e) => {
                  setInfo({ ...info, username: e.target.value });
                }}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={info.password}
                onChange={(e) => {
                  setInfo({ ...info, password: e.target.value });
                }}
              />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                type="button"
                onClick={register}
              >
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
