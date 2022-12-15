import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1 }} padding=" 3em">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item style={{ background: "#1a1a1a", color: "white" }}>
            <h1>Community pick</h1>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
