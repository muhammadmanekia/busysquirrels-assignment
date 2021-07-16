import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import UserPool from "../UserPool";
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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess", data);
        setOpen(true);
        setSeverity("success");
        setMessage("You're signed in");
        setAccount(true);
      },

      onFailure: (error) => {
        console.log("onFailure", error);
        setOpen(true);
        setSeverity("error");
        setMessage(error.message);
      },

      newPasswordRequired: (data) => {
        console.log("newPasswordRequired", data);
      },
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="space-evenly">
            <Grid item>
              <Link href="/changePassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Create Account
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {account && <Redirect to="/account" />}
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

export default Signin;
