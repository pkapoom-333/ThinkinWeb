import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField, Button, IconButton } from "@mui/material";
import { CusTomPaper } from "../style";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useUserAuth } from "../Contexts/AuthContext";
import { db } from "../../firebase";
import { ImgAvatar } from "../ImgAvatar";
const Profile = () => {
  let { user } = useUserAuth();
  const navigate = useNavigate();
  const [avatarPage, setAvatarPage] = useState(true);
  const [avatarName, setAvatarName] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(0);
  const handleNextImage = () => {
    avatarIndex !== 9 ? setAvatarIndex(avatarIndex + 1) : setAvatarIndex(0);
  };
  const handleBackImage = () => {
    avatarIndex !== 0 ? setAvatarIndex(avatarIndex - 1) : setAvatarIndex(9);
  };
  const handlecreateAvatar = async () => {
    const docRef = doc(db, "Avatar", user.uid);
    const payload = {
      avatarID: avatarIndex,
      userName: avatarName,
      userRef: user.uid,
    };
    await setDoc(docRef, payload);
    navigate("/wecomepage");
  };
  useEffect(() => {
    findAvatar();
  }, []);
  const findAvatar = async () => {
    const docRef = doc(db, "Avatar", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      navigate("/wecomepage");
    }
  };

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
            {avatarPage ? (
              <div style={{ padding: 30 }}>
                <Typography
                  variant="h4"
                  component="div"
                  align="center"
                  sx={{ color: "rgba(0, 71, 187, 1)" }}
                  style={{ paddingTop: 20 }}
                >
                  What’s your avatar name?
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  align="center"
                  sx={{ color: "rgba(0, 71, 187, 1)" }}
                  style={{ paddingBottom: 20 }}
                >
                  This will be shown as your account name.
                </Typography>
                <TextField
                  id="standard-multiline-flexible"
                  variant="standard"
                  fullWidth
                  style={{ paddingTop: 100, paddingBottom: 60 }}
                  value={avatarName}
                  onChange={(e) => setAvatarName(e.target.value)}
                />
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
                    onClick={() => setAvatarPage(false)}
                    disabled={avatarName === "" ? true : false}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ padding: 30 }}>
                <Typography
                  variant="h4"
                  component="div"
                  align="center"
                  sx={{ color: "rgba(0, 71, 187, 1)" }}
                  style={{ paddingTop: 20 }}
                >
                  Choose your avatar
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  align="center"
                  sx={{ color: "rgba(0, 71, 187, 1)" }}
                  style={{ paddingBottom: 20 }}
                >
                  This will be your representative.
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    paddingTop: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 50,
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      sx={{ width: 30, height: 30 }}
                      onClick={handleBackImage}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>
                  </div>
                  {ImgAvatar.map((item, index) => {
                    if (index === avatarIndex) {
                      return (
                        <img
                          key={index}
                          alt={`${item.code}`}
                          src={item.scr}
                          style={{ width: 200, height: 200 }}
                        />
                      );
                    }
                  })}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: 50,
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                      onClick={handleNextImage}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    paddingTop: 40,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ padding: "10px 80px", borderRadius: 20 }}
                    onClick={handlecreateAvatar}
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CusTomPaper>
      </Grid>
    </Grid>
  );
};

export default Profile;
