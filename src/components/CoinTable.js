import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    transition: "all 300ms ",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

const CoinTable = () => {
  const history = useHistory();
  const classes = useStyles();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Poppins" }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            value={search}
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(search);
            }}
          />
          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress
                style={{ backgroundColor: "gold" }}
              ></LinearProgress>
            ) : (
              <>
                <Table aria-label="simple table">
                  <TableHead
                    style={{
                      backgroundColor: "#EEBC1D",
                    }}
                  >
                    <TableRow>
                      {["Coin", "Price", "24h Change", "Market Cap"].map(
                        (head) => (
                          <TableCell
                            style={{
                              color: "black",
                              fontWeight: "700",
                              fontFamily: "Poppins",
                            }}
                            key={head}
                            align={head === "Coin" ? "" : "right"}
                          >
                            {head}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {console.log(handleSearch())}
                    {handleSearch()
                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
                      .map((row) => {
                        const profit = row.price_change_percentage_24h > 0;
                        return (
                          <>
                            <TableRow
                              className={classes.row}
                              key={row.name}
                              onClick={() => history.push(`/coins/${row.id}`)}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                styles={{
                                  display: "flex",
                                }}
                              >
                                <div
                                  styles={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <img
                                    src={row?.image}
                                    alt={row.name}
                                    height="50"
                                    style={{ marginBottom: 10 }}
                                  />
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span
                                      style={{
                                        textTransform: "uppercase",
                                        fontSize: 22,
                                        fontFamily: "Poppins",
                                      }}
                                    >
                                      {row.symbol}
                                    </span>
                                    <span
                                      style={{
                                        color: "darkgrey",
                                        fontFamily: "Poppins",
                                      }}
                                    >
                                      {row.name}
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell align="right" style={{ fontSize: 17 }}>
                                {symbol}{" "}
                                {numberWithCommas(row.current_price.toFixed(2))}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  color:
                                    profit > 0 ? "rgb(14, 203, 129)" : "red",
                                  fontWeight: 500,
                                  fontSize: 17,
                                }}
                              >
                                {profit && "+"}
                                {row.price_change_percentage_24h.toFixed(2)}%
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontSize: 17, color: "gold" }}
                              >
                                {symbol}{" "}
                                {numberWithCommas(
                                  row.market_cap.toString().slice(0, -6)
                                )}
                                M
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </>
            )}
          </TableContainer>
          <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinTable;
