import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import fb from "../../assets/facebook-logo.png";
import linkedin from "../../assets/linkedIn-logo.png";
import twitter from "../../assets/twitter.png";
import "./Footer.css";
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  const gridContainerStyle = {
    marginBottom: '1rem',
  };
  const gridItemStyle = {
    display: 'flex',
    flexDirection: 'column',
  };
  const socialMediaIconsStyle = {
    marginTop: '1rem',
  };

  return (
    <>
      <Box
        bgcolor={"background.footer"}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8,mb: 2 }} maxWidth="sm">
          <Grid container spacing={5} style={gridContainerStyle}>
            <Grid item xs={6} sm={3} style={gridItemStyle}>
              <Typography variant='h6' color={"white"}>Quick Links</Typography>
              <a href='/faqs'>
                <p>FAQs</p>
              </a>
              <a href='#'>
                <p>Investor contacts</p>
              </a>
              <a href='#'>
                <p>Media contacts</p>
              </a>
            </Grid>
            <Grid item xs={6} sm={3} style={gridItemStyle}>
              <Typography variant="h6" color={"white"}>About Us</Typography>
              <a href='#'>
                <p>Leadership & governance</p>
              </a>
              <a href='#'>
                <p>Bank of APIs</p>
              </a>
              <a href='#'>
                <p>Supplying goods and services UK</p>
              </a>
            </Grid>
            <Grid item xs={6} sm={3} style={gridItemStyle}>
              <Typography variant="h6" color={"white"}>Other Links</Typography>
              <a href='#'><div><p>Term & Conditions</p></div></a>
              <a href='#'><div><p>Privacy Policies</p></div></a>
              <a href='#'><div><p>Cookies Management</p></div></a>
            </Grid>

            <Grid item xs={12} sm={3} style={gridItemStyle}>
              <Typography variant="h6" color={"white"}>Follow Us</Typography>
              <div style={socialMediaIconsStyle}>
                <a
                  href="https://www.facebook.com/your-facebook-page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={fb}
                    alt="Facebook"
                    width="32"
                    height="32"
                  />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={twitter}
                    alt="twitter"
                    width="32"
                    height="32"
                  />
                </a>
                <a href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={linkedin}
                    alt='LinkedIn'
                    width="32"
                    height="32" />
                </a>
              </div>
            </Grid>
          </Grid>
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
{/*          <Container maxWidth="sm">
            <Typography variant="body1" color={"black"}>
              &copy;{new Date().getFullYear()} Natwest Group. All rights reserved.
            </Typography>
          </Container>*/
}        </Box>
      </Box>
    </>

  )
}

export default Footer;