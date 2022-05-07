import React, { useState } from "react";
import GoogleLogo from "../images/GoogleLogo";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { useUserAuth } from "../Contexts/AuthContext";
import { CusTomPaper } from "../style";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, googleSingIn } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleSubmit() {
    try {
      await logIn(email, password);
      navigate("/wecomepage");
    } catch (err) {
      setError(err.message);
    }
  }
  async function handleGoogleSignIn() {
    try {
      await googleSingIn();
      navigate("/wecomepage");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <CusTomPaper elevation={3}>
          <form>
            <div style={{ padding: 30 }}>
              <Typography
                variant="h4"
                component="div"
                align="center"
                sx={{ color: "rgba(0, 71, 187, 1)" }}
                style={{ paddingTop: 20 }}
              >
                Welcome back!
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="center"
                sx={{ color: "rgba(0, 71, 187, 1)" }}
                style={{ paddingBottom: 20 }}
              >
                We are happy to see you again.
              </Typography>
              <TextField
                id="standard-multiline-flexible"
                label={
                  <span style={{ color: "rgba(0, 71, 187, 1)" }}> Email</span>
                }
                placeholder="@email"
                variant="standard"
                fullWidth
                value={email}
                style={{ paddingTop: 20, paddingBottom: 20 }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="standard-multiline-flexible"
                label={
                  <span style={{ color: "rgba(0, 71, 187, 1)" }}>
                    {" "}
                    Password
                  </span>
                }
                placeholder="******"
                variant="standard"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingTop: 20, paddingBottom: 20 }}
              />
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                align="left"
              ></Typography>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                <Button
                  variant="contained"
                  sx={{ padding: "10px 80px", borderRadius: 20 }}
                  onClick={handleSubmit}
                >
                  Log in
                </Button>
              </div>
              {error !== "" && (
                <Typography
                  variant="subtitle1"
                  component="div"
                  align="center"
                  style={{ paddingTop: 20, color: "red" }}
                >
                  {error}
                </Typography>
              )}
              <Typography
                variant="subtitle1"
                component="div"
                align="center"
                style={{ paddingTop: 20, color: "rgba(105, 105, 105, 1)" }}
              >
                Doesn’t have an account? or <Link to="/signup">Sign up</Link>
              </Typography>

              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                <Button
                  startIcon={<GoogleLogo />}
                  sx={{
                    borderRadius: 20,
                    padding: "5px 20px",
                    border: "1px solid #ADADAD",
                    backgroundColor: "transparent",
                    color: "rgba(0, 0, 0, 1)",
                  }}
                  onClick={handleGoogleSignIn}
                >
                  Continue with Google
                </Button>
              </div>
            </div>
          </form>
        </CusTomPaper>
      </Grid>
    </Grid>
  );
};

export default Login;
