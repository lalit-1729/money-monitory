import React ,{ useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, Box } from "@mui/material";
import character from "../../assets/character.png";
import { grey} from "@mui/material/colors";

const SavingsBox = styled(Box)(({ theme }) => ({
  height: 600,
  marginRight: "16px",
  marginTop: "16px",
  marginBottom: "16px",
  [theme.breakpoints.down("md")]: {
    marginLeft: "16px",
    height: 400,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
   float:"right"
  },
}));


export default function TotalSavings(props) {


  return (
    <SavingsBox>
     
      <Card
        sx={{
          overflow:"visible",
          minWidth: 275,
          position:"relative",
          borderRadius: "16px",
          paddingTop: "128px",
          paddingRight: "30px",
          paddingLeft: "30px",
          paddingBottom: "30px",
          marginTop: "120px",
          bgcolor:"background.home"
         
        }}
      >
       <Box
        sx={{ position: "absolute", left: "40px", width: "140px" ,top:"-70px"}}
        component="img"
        alt="Character"
        src={character}
      />
        <CardContent>
          <Typography
            sx={{ fontSize: "1.775rem",  color:"#ffffff" }}
            color="text.secondary"
            gutterBottom
          >
            Total Savings
          </Typography>
          <StyledTypography
            sx={{ fontSize: "2.975rem" ,  color:"#ffffff"}}
            variant="h5"
            component="div"
          
          >
            £ {props.totalSavings.toFixed(2)}
          </StyledTypography>
          <Typography sx={{ mb: 1.5,color:"#ffffff" }} >
            Make more transactions to save more.
          </Typography>
          <Typography variant="body2"  color="#ffffff">
          Make Your Spare Change Count!
            <br />
            
          </Typography>
        </CardContent>
        {/* <CardActions  color="#ffffff" >
          <Button size="small" color="secondary">View Dashboard</Button>
        </CardActions> */}
      </Card>
    </SavingsBox>
  );
}
