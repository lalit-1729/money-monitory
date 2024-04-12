import { Box,styled } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../../assets/dashboard.png";
import savingsTransfer from "../../assets/savingsTransfer.png";
import transact from "../../assets/transact.png";
import transactionHistory from "../../assets/transactionHistory.png";
import transferMerchant from "../../assets/transferMerchant.png";
import './style.css';

const ServicesCard = styled(Card)(({ theme }) => ({

  height: 370,
  borderRadius: "16px",

}));

const ProfileCard = styled(Card)(({ theme }) => ({

  height: 800,
  borderRadius: "16px",

  [theme.breakpoints.down("md")]: {

    height: 400,
  },
  [theme.breakpoints.down("sm")]: {

    display: "none"

  },
}));

const ServicesBox = styled(Box)(({ theme }) => ({

  mt: 4,mr: 8,ml: 8,


}));

export default function Services() {
  return (
    <ServicesBox >
      <Typography variant="h4" sx={{ mt: 2,textAlign: 'center' }} gutterBottom>
        Our Services
      </Typography>
      <Grid container>
        <Grid item sm={12} md={4}>

          <ProfileCard sx={{ p: 2,m: 4 }}>
            <CardMedia
              sx={{ height: 600 }}
              image={transact}
            />
          </ProfileCard>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Grid container>
            <Grid item xs={12} sm={6} md={6}>
              <div className="card">
                <Link to="/transfer">
                  <ServicesCard sx={{ p: 2,m: 4 }}>
                    <CardMedia
                      sx={{ height: 170 }}
                      image={transferMerchant}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" alignContent="center">
                        Pay Merchants
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Link to="/transfer"> */}
                        <Button variant="text" size="small">Visit Page</Button>
                      {/* </Link> */}
                    </CardActions>
                  </ServicesCard>
                </Link>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <div className="card">
                <Link to="/transferToPrimary">
                  <ServicesCard sx={{ p: 2,m: 4 }}>
                    <CardMedia
                      sx={{ height: 170 }}
                      image={savingsTransfer}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Transfer From Savings to Primary Account
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Link to="/transferToPrimary"> */}
                        <Button size="small">Visit Page</Button>
                      {/* </Link> */}

                    </CardActions>
                  </ServicesCard>
                </Link>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <div className="card">
                <Link to='/RoundUpTransactionHistory'>
                  <ServicesCard sx={{ p: 2,m: 4 }}>
                    <CardMedia
                      sx={{ height: 170 }}
                      image={transactionHistory}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Transactions and Savings
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Link to="/RoundUpTransactionHistory"> */}
                        <Button size="small">Visit Page</Button>
                      {/* </Link> */}

                    </CardActions>
                  </ServicesCard>
                </Link>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <div className="card">
                <Link to={"/faqs"}>
                <ServicesCard sx={{ p: 2,m: 4 }}>
                  <CardMedia
                    sx={{ height: 170 }}
                    image={dashboard}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      FAQs
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Visit Page</Button>
                  </CardActions>
                </ServicesCard>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ServicesBox>
  );
}
