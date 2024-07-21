import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MobileStepper from "@mui/material/MobileStepper";
import { styled } from "@mui/material/styles";

import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import smallsavings from "../../assets/small savings.avif";
import bot from "../../assets/bot.png";
import future from "../../assets/carfuture.png";
import futureDark from "../../assets/futureDark.png";
import save from "../../assets/smallsav.png";
import saveDark from "../../assets/smallSavDark.png";
import botDark from "../../assets/botDark.png";
import secure from "../../assets/secure.png";
import secureDark from "../../assets/secureDark.png";
import money from "../../assets/money.gif";

import feature from "../../assets/features.png";
import { Link } from "react-router-dom";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const CarousalBox = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  marginTop: "40px",
  marginBottom: "40px",
  marginRight: "200px",
  marginLeft: "200px",
  maxWidth: 1700,

  [theme.breakpoints.down("md")]: {
    marginRight: "40px",
    marginLeft: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "16px",
    marginLeft: "16px",
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  width:"70%",
  paddingLeft:"15%",
  paddingTop:"10%",

}));

const FeatureBox = styled(Box)(({ theme }) => ({
  width:"100%",
  paddingLeft:"6%",
  paddingTop:"10%",
}));

const GetStartedBox = styled(Box)(({ theme }) => ({
  marginTop: "40px",
  marginBottom: "40px",
  marginRight: "200px",
  marginLeft: "200px",
  paddingBottom:"40px",

  [theme.breakpoints.down("md")]: {
    marginRight: "60px",
    marginLeft: "60px",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "16px",
    marginLeft: "16px",
  },
}));

const CarousalImageBox = styled(Box)(({ theme }) => ({
  height: 500,
  display: "block",
  maxWidth: 2000,
  overflow: "hidden",
  width: "100%",
  borderRadius: "16px",

  [theme.breakpoints.down("md")]: {
    height: 400,
  },
  [theme.breakpoints.down("sm")]: {
    height: 200,
  },
}));

function AboutUs() {
  var images = [
    {
      label: "Round the clock customer support",
      img: bot,
      darkImg:botDark
    },
    {
      label: "From us to you",
      img: future,
      darkImg:futureDark
    },
    {
      label: "Start Today",
      img: save,
      darkImg:saveDark
    },
    {
      label: "Your Security matters to us",
      img: secure,
      darkImg:secureDark
    },
    
  ];

  const theme = useContext(ThemeContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box maxWidth="xl" bgcolor={"background.home"} >
      <GetStartedBox>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ marginTop: 6, fontSize: "3rem", color: "#ffffff" }}
            >
              Make Your Spare Change Count!
            </Typography>
            <Typography
              sx={{ marginTop: 2, fontSize: "1.775rem", color: "#E5CFF7" }}
            >
              It’s automatic. Like magic.
            </Typography>

            <Typography
              sx={{ marginTop: 2, fontSize: "1.4rem", color: "#F5F5F5" }}
            >
              Our "Round Up" service helps you effortlessly save your spare
              change with every debit card transaction.
             
            </Typography>

            <Link to={"/register"}>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                sx={{ marginTop: 2 }}
              >
                Get Started
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} alignItems="center">
            <ImageBox
              component="img"
              alt="money"
              src={money}
            />
          </Grid>
        </Grid>
      </GetStartedBox>

      <CarousalBox>
      <Typography variant="h3" sx={{mt:2,mb:4,textAlign: 'center',color:"#E5CFF7"}} gutterBottom>
        Why choose PennyBank?
      </Typography>
        <Box sx={{ flexGrow: 2 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,

              bgcolor: "background.default",
            }}
          >
            <Box
              sx={{
                padding: "24px",
                fontSize: "1.125rem",
                fontWeight: 700,
              }}
            >
              <div>{images[activeStep].label}</div>{" "}
            </Box>
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <CarousalImageBox
                    component="img"
                    src={theme.mode==='light'?step.img:step.darkImg}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </CarousalBox>

      <GetStartedBox>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ marginTop: 6, fontSize: "3rem", color: "#ffffff" }}
            >
              Explore Our Features!
            </Typography>
            {/* <Typography
              sx={{ marginTop: 6 }}
              style={{
                fontFamily: "cursive",
                fontSize: "XX-Large",
                color: "powderblue",
                fontWeight: "bold",
              }}
            >
              Explore Our Features!
            </Typography> */}
            <Typography
              sx={{ marginTop: 2 ,marginTop: 2, fontSize: "1.2rem", color: "#E5CFF7" }}
              // style={{
              //   fontFamily: "cursive",
              //   fontSize: "Large",
              //   color: "White",
              // }}
            >
              We want to reacquaint people with the power of savings through the
              concept of a micro savings account, and ultimately help them grow
              their savings by providing access to financial services - all in
              one place!
            </Typography>

            <Link to={"/register"}>
              <Button
                variant="outlined"
                endIcon={<AutoFixHighIcon />}
                color="secondary"
                sx={{ marginTop: 2 }}
                size="large"
              >
                Tap to explore!
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} sx={{ p: 2 }}>
            <FeatureBox
             
              component="img"
              alt="feature"
              src={feature}
            />
          </Grid>
        </Grid>
      </GetStartedBox>
    </Box>
  );
}

export default AboutUs;
