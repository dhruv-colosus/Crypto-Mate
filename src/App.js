import "./App.css";
import Header from "./components/Header";
import Home from "./screens/Home";
import CoinPage from "./screens/CoinPage";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles, withTheme } from "@material-ui/core";

function App(props) {
  const useStyles = makeStyles({
    App: {
      backgroundColor: "#1b1e29",
      color: "white",
      minHeight: "100vh",
    },
  });
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/coins/:id">
            <CoinPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
