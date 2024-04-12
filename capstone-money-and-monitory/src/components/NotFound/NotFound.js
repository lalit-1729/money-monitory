import React from "react";
import gift from "../../assets/404nf.gif";
import { Typography, Box } from "@mui/material";
import "./NotFound.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
export default function NotFound() {
  return (
    <Box sx={{ mt: 6 }}>
      <section className="page_404">
	<div className="container">
		<div className="row">	
		<div className="col-sm-12 ">
		<div className="col-sm-12 col-sm-offset-1  text-center">
		<div className="four_zero_four_bg">
			<h1 className="text-center ">404</h1>
		
		
		</div>
		
		<div className="contant_box_404">
		<h3 className="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		<Link to='/Home'>
		<Button variant="outlined" color="primary">Go Home</Button>
		</Link>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
    </Box>
  );
}
