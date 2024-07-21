import { Box,Grid,ListItemButton,Stack,Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function LogoutPage() {
  return (
    <Box
      paddingY={"20vh"}
      textAlign={"center"}
      sx={{ justifyContent: "center" }}
    >
      <Typography variant="h2">
        You have been successfully logged out!
      </Typography>
      <Typography>
        Thank you for using our website. We hope you come back again soon!
      </Typography>
      <Grid
        container
        spacing={2}
        paddingY={"40px"}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Stack direction="row" spacing={2}>
          <ListItemButton>
            <Link to={"/home"}><Typography color={"secondary"}>Home</Typography></Link>
          </ListItemButton>
          <ListItemButton>
            <Link to={"/faqs"}><Typography color={"secondary"}>FAQs</Typography></Link>
          </ListItemButton>
          <ListItemButton>
            <Link to={"/contact-us"}><Typography color={"secondary"}>Contact Us</Typography></Link>
          </ListItemButton>
        </Stack>
      </Grid>
    </Box>
  );
}

export default LogoutPage;
