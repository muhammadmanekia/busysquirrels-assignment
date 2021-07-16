import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserPool from "../UserPool";
import {
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AccountContext } from "./Accounts";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2vh",
  },
  avatar: {
    flexDirection: "column",

    margin: theme.spacing(1),
    backgroundColor: "#8b8f8e",
    width: theme.spacing(40),
    height: theme.spacing(40),
    boxShadow: "0 2px 6px #5e6969",
  },
  icon: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

const Account = () => {
  const classes = useStyles();

  const [redirect, setRedirect] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const { getSession } = useContext(AccountContext);

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      console.log(user);
      setRedirect(true);
    }
  };

  useEffect(() => {
    getSession()
      .then((data) => {
        if (data) {
          setFirstName(data["custom:FirstName"]);
          setLastName(data["custom:LastName"]);
        }
      })
      .catch((e) => {
        console.log(e);
        setRedirect(true);
      });
  }, [getSession]);

  return (
    <Container
      component="main"
      style={{
        boxShadow: "0 2px 6px #c5dbdb",
      }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon className={classes.icon} />
        </Avatar>
        <Typography
          component="h1"
          variant="h4"
          style={{
            margin: "2vh",
            color: "black",
            fontWeight: "800",
          }}
        >
          Hello {FirstName} {LastName}
        </Typography>
        <Typography
          component="h1"
          variant="h3"
          style={{
            margin: "1vh",
            color: "#4caf50",
            fontWeight: "800",
          }}
        >
          You're Logged In!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "20px" }}
          onClick={logout}
        >
          Logout
        </Button>
        {redirect ? <Redirect to="/signin" /> : null}
      </div>
    </Container>
  );
};

export default Account;
