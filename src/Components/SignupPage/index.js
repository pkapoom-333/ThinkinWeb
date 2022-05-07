import React, { useState } from "react";
import GoogleLogo from "../images/GoogleLogo";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Contexts/AuthContext";
import { CusTomPaper } from "../style";

const SingUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const { signup } = useUserAuth();
  const navigate = useNavigate();
  async function handleSubmit() {
    if (passwordConfirm === password) {
      try {
        await signup(email, password);
        navigate("/createProfile");
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Error password");
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
          minWidth: 500,
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
                Create an account
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="center"
                sx={{ color: "rgba(0, 71, 187, 1)" }}
                style={{ paddingBottom: 20 }}
              >
                Join our community and be a part of us.
              </Typography>
              <TextField
                id="standard-multiline-flexible"
                label={
                  <spn style={{ color: "rgba(0, 71, 187, 1)" }}> Email</spn>
                }
                placeholder="@email"
                variant="standard"
                fullWidth
                style={{ paddingTop: 20, paddingBottom: 20 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                id="standard-multiline-flexible"
                label={
                  <span style={{ color: "rgba(0, 71, 187, 1)" }}> Password</span>
                }
                placeholder="******"
                variant="standard"
                fullWidth
                type="password"
                style={{ paddingTop: 20, paddingBottom: 20 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                id="standard-multiline-flexible"
                label={
                  <span style={{ color: "rgba(0, 71, 187, 1)" }}>
                    Password Confirmation
                  </span>
                }
                placeholder="******"
                variant="standard"
                fullWidth
                type="password"
                style={{ paddingTop: 20, paddingBottom: 20 }}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
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
                  Sign up
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
                Already have an account?
                <Link to="/">Log in</Link>
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

export default SingUp;
