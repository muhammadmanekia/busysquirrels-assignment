import React, { useState } from "react";
import UserPool from "../UserPool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Snackbar,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    let attributeList = [
      new CognitoUserAttribute({
        Name: "custom:FirstName",
        Value: firstName,
      }),
      new CognitoUserAttribute({
        Name: "custom:LastName",
        Value: lastName,
      }),
    ];

    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        setOpen(true);
        setSeverity("error");
        setMessage(err.message);
      }
      if (data) {
        setOpen(true);
        setSeverity("success");
        setMessage(
          "Registration was Successful!. Please Verify your Email and Sign in"
        );
        setInterval(() => {
          setRedirect(true);
        }, 5000);
      }
      console.log(data);
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        boxShadow: "0 2px 6px #c5dbdb",
      }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item xs>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {redirect && <Redirect to="/signin" />}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
