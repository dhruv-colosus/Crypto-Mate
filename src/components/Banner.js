import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import "./Banner.css";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: "25",
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className="banner">
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Poppins",
            }}
          >
            Crypto Mate
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "#f5f542",
              textTransform: "capitalize",
              fontSize: "1rem",
            }}
          >
            Your All in One Crypto Tracker
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
