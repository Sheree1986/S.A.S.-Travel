import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Cube from "./Cube";
import CTA from "./CTA.jsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#1a1a1a",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={22}>
        <Grid item xs={12}>
          <Item>
            <CTA />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Cube />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
