import React, { useEffect, useState } from "react";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CusTomPaper } from "../style";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useUserAuth } from "../Contexts/AuthContext";
import StarIcon from "@mui/icons-material/Star";
import { db } from "../../firebase";
import { ImgAvatar } from "../ImgAvatar";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CircularProgress from "@mui/material/CircularProgress";
const Center = () => {
  let { user } = useUserAuth();
  useEffect(() => {
    findAvatar();
    getDataFeed();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const [text, setText] = useState();
  const [avatar, setAvatar] = useState();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const handlePost = async () => {
    const docRef = doc(db, "Feed", `${new Date().getTime()}`);
    const payload = {
      time: new Date(),
      text: text,
      userRef: user.uid,
      like: 0,
      comment: 0,
    };
    await setDoc(docRef, payload);
    setText("");
    getDataFeed();
  };
  const findAvatar = async () => {
    const docRef = doc(db, "Avatar", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAvatar(docSnap.data());
    } else {
      findAvatar();
    }
  };
  const getDataFeed = async () => {
    const collectionRef = collection(db, "Feed");
    onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const convertData = data.map((data) => {
        return {
          ...data,
          avtarRef: findAvatarFeed(data.userRef).then((result) => result),
        };
      });
      console.log("convertData", convertData);
      setFeed(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  const findAvatarFeed = async (userId) => {
    const docRef = doc(db, "Avatar", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  };
  return (
    <Grid>
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
        <CusTomPaper elevation={3} style={{ minWidth: 500 }}>
          <Grid container>
            <Grid item xs={3}>
              <img
                key={0}
                alt={avatar ? `${avatar.userName}` : "no"}
                src={avatar ? ImgAvatar[avatar.avatarID].scr : ""}
                style={{ width: 100, height: 100, padding: 20 }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
                padding: "20px",
              }}
            >
              <TextField
                id="standard-multiline-static"
                multiline
                rows={4}
                placeholder="What’s your thoughts?"
                variant="standard"
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                color="primary"
                style={{ padding: 20 }}
                onClick={handlePost}
              >
                <AddIcon sx={{ fontSize: 80 }} />
              </IconButton>
            </Grid>
          </Grid>
        </CusTomPaper>
      </Grid>
      {loading ? (
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
          <CircularProgress />
        </Grid>
      ) : (
        feed.map((data, index) => (
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <CusTomPaper elevation={3} style={{ minWidth: 500 }}>
              <Grid container>
                <Grid item xs={3}>
                  <img
                    key={0}
                    alt={avatar ? `${avatar.userName}` : "no"}
                    src={avatar ? ImgAvatar[avatar.avatarID].scr : ""}
                    style={{ width: 100, height: 100, padding: 20 }}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    padding: "20px",
                  }}
                >
                  <Typography
                    component="div"
                    align="left"
                    sx={{
                      color: "rgba(0, 0, 0, 1)",
                      fontSize: 26,
                      fontWeight: 700,
                    }}
                  >
                    name
                  </Typography>
                  <Typography
                    component="div"
                    align="left"
                    sx={{
                      color: "rgba(173, 173, 173, 1)",
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    Just now
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton color="primary" size="large">
                    <MoreHorizIcon color="disabled" sx={{ fontSize: 50 }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    padding: "10px 20px",
                  }}
                >
                  <Typography
                    component="div"
                    align="left"
                    sx={{
                      color: "rgba(24, 24, 24, 1)",
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                  >
                    name
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={4}
                  sx={{
                    padding: "10px 20px",
                    display: "flex",
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  <IconButton color="primary" size="large">
                    <StarIcon color="disabled" sx={{ fontSize: 30 }} />
                  </IconButton>
                  <Typography
                    component="div"
                    align="left"
                    sx={{
                      color: "rgba(24, 24, 24, 1)",
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                  >
                    20
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{
                    padding: "10px 20px",
                    display: "flex",
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  <IconButton color="primary" size="large">
                    <ChatBubbleOutlineIcon
                      color="disabled"
                      sx={{ fontSize: 30 }}
                    />
                  </IconButton>
                  <Typography
                    component="div"
                    align="left"
                    sx={{
                      color: "rgba(24, 24, 24, 1)",
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                  >
                    10
                  </Typography>
                </Grid>
              </Grid>
            </CusTomPaper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Center;
