import React from "react";
import Center from "./Center";
import RightBat from "./RightBat";
import LeftBar from "./LeftBar";
import { Grid } from "@mui/material";
const index = () => {
  return (
    <Grid container>
      <Grid item sm={false} md={3}>
        <LeftBar />
      </Grid>
      <Grid item sm={false} md={6}>
        <Center />
      </Grid>
      <Grid item sm={false} md={3}>
        <RightBat />
      </Grid>
    </Grid>
  );
};

export default index;
