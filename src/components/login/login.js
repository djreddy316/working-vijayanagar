import React, { Component } from "react";
import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./login.css";
import src from "../assets/JSW-logo.png";
import { Label } from "office-ui-fabric-react";
import {toast} from 'react-toastify'; 
// const inputProps = {
//   color: "white",
// };

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      open: false,
      error_message: "ccccccccc",
    };
  }
    

  setUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  setPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  signIn = () => {
    if (this.state.password == "" || this.state.username == "") {
      console.log("Username or password should not be blank");
      return;
    }
    /*if (this.state.username === "admin" && this.state.password === "admin") {
      this.setState({
        open: true,
        message: "You have successfully Logged In!",
      });
      this.props.history.push("/dashboard");
    } else {
      this.setState({
        open: true,
        message: "Incorrect Username or Password!",
      });
    }*/
    let userInfo = {
      username: this.state.username,
    };
    fetch(
      "https://7fidxh52z5.execute-api.ap-south-1.amazonaws.com/prod/getplatformusers ",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userInfo),
      }
    )
      .then((r) => r.json())
      .then((res) => {
        console.log("Äpi_call_success=>", res);
        if (this.state.password != res.data.password) {
         this.setState({
        open: true,
        message: "Incorrect Username or Password!",
		}); //Need to replace with toast
		toast('Incorrect Username or Password!')
		//this.props.history.push("/login");
        } else {
          localStorage.setItem("role_id", res.data.role);
		   localStorage.setItem("user_name", res.data.username);
          this.setState({
            open: true,
            message: "You have successfully Logged In!",
          });
          this.props.history.push("/dashboard");
        }
      });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div className="welcome-screen">
        <div className="split left">
          <div className="info">
            <img src={src} alt="JSW | Salem Works" />
            <h1 style={{ color: "white" }}>Logistics Suite</h1>
            <h1 style={{ color: "white" }}>Outbound Loading</h1>
            <h1 style={{ color: "white" }}>Tally Checker Application</h1>
          </div>
        </div>

        <div className="split right">
          <div className="info">
            <h2 style={{ color: "white" }}>Login</h2>
            <TextField
              variant="standard"
              placeholder="Userame"
              margin="normal"
              //   required
              color="white"
              className="text-field"
              onChange={this.setUsername}
              value={this.state.username}
              inputProps={{ color: "white" }}
            />
            <TextField
              className="text-field"
              variant="standard"
              placeholder="Password"
              margin="normal"
              // required
              type="password"
              onChange={this.setPassword}
              value={this.state.password}
            />
            <Label
              className="text-field"
              variant="standard"
              placeholder="Password"
              margin="normal"
              value={this.state.error_message}
            />

            <div className="button">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.signIn();
                }}
              >
                Log In
              </Button>
            </div>
          </div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Sign In</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {this.state.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
				Okay
			</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default SignIn;
