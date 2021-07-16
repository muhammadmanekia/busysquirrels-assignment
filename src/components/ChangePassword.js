import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [returnToSignIn, setReturnToSignIn] = useState(false);

  const classes = useStyles();

  const getUser = () => {
    return new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
  };

  const sendCode = (e) => {
    e.preventDefault();

    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess", data);
      },
      onFailure: (error) => {
        console.log("onFailure", error);
      },
      inputVerificationCode: (code) => {
        console.log("code:", code);
        setStage(2);
      },
    });
  };
  const resetPassword = (e) => {
    e.preventDefault();

    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log("onSuccess", data);
      },
      onFailure: (error) => {
        console.log("onFailure", error);
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
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        {stage === 1 && (
          <form className={classes.form} onSubmit={sendCode}>
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
            <Button type="submit">Send Verification Code</Button>
          </form>
        )}
        {stage === 2 && (
          <form className={classes.form} onSubmit={resetPassword}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Code"
              label="Code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="Code"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="New Password"
              name="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Confirm Password"
              name="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <Button type="submit">Confirm Password</Button>
          </form>
        )}
        <Button onClick={setReturnToSignIn}>Return to Sign In</Button>
        {returnToSignIn && <Redirect href="/signin"></Redirect>}
      </div>
    </Container>
  );
};

export default ChangePassword;
