/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { connect } from "react-redux"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";
import { userActions } from "../../_actions";
import { alertActions } from '../../_actions';
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.props.dispatch(userActions.logout())
    this.state = {
      loginEmailState: "",
      loginPasswordState: "",
      forgetPsw: {
        email: ""
      },
      login: {
        email: "",
        password: ""
      },
      form_state: false,
      isOpenForgotPasswordPage: false,
      isLoading: false
    };
    this.props.dispatch(alertActions.clear());
  }
  componentDidMount() {
    
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  loginClick = () => {
    if (this.state.loginEmailState === "") {
      this.setState({ form_state : false})
      this.setState({ loginEmailState: "has-danger" });
    } 
    if (this.state.loginPasswordState === "") {
      this.setState({ form_state : false})
      this.setState({ loginPasswordState: "has-danger" });
    }
    if(
      this.state.loginEmailState === "has-success" && 
      this.state.loginPasswordState === "has-success" 
    ) {
      this.setState({form_state: true});
  
      let user = {
        email: this.state.login.email,
        password: this.state.login.password,
      }

      this.props.dispatch(userActions.login(user))
  }
}
  change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    let login = this.state.login;

    login[event.target.name] = event.target.value;
    this.setState({ login });
    switch (type) {
      case "name":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  };
  verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };


  render() {
   
    let {
      loginEmailState,
      loginPasswordState,
    } = this.state;

    if(this.props.loggedIn) {
      this.props.history.push('/admin/dashboard')
      return (<Redirect to="/admin/dashboard" />)
    }

    return (
      <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form" onSubmit={this.onSubmit}>
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("assets/img/sample_logo_1.png")}
                    />
                    <CardTitle tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup className={` ${loginEmailState}`}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={this.state.login.email}
                        onChange={e => this.change(e, "loginEmail", "email")} />
                    </InputGroup>
                    <InputGroup className={` ${loginPasswordState}`}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={this.state.login.password}
                        onChange={e => this.change(e, "loginPassword", "password")} />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      href="#pablo"
                      onClick={this.loginClick}
                      type="button"
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <Link
                          className="link footer-link"
                          to="/auth/register"
                        >
                          Create Account
                        </Link>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link footer-link"
                          href="/auth/login"
                          onClick={e => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  }
}


function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
}

export default connect(mapStateToProps)(Login)
