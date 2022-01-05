import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTheme } from "@material-ui/core/styles";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxHeight: 60,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    title: {
      color: "gold",
      flex: 1,
      fontFamily: "Poppins",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    appbar: {
      backgroundColor: "#101217",
    },
  }));
  const classes = useStyles();

  const { currency, setCurrency } = CryptoState();
  console.log(currency);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar className={classes.appbar} position="static">
          <Container>
            <Toolbar>
              <Typography
                variant="h6"
                className={classes.title}
                onClick={() => {
                  history.push("/");
                }}
              >
                Crypto Mate
              </Typography>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Currency
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Age"
                  variant="outlined"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
              </FormControl>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
