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
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import { userActions } from "../../_actions";
import { Redirect } from "react-router-dom";

import { alertActions } from '../../_actions';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      form_state: false,
      registerNameState: "",
      registerEmailState: "",
      registerPasswordState: "",
      registerConfirmPasswordState: "",
      terms_state: false,
      isActive: false,
      errors: false,
      c_password: "",
      registration: {
        registerName: "",
        registerEmail: "",
        registerPassword: "",
        registerConfirmPassword: ""
      }
    };

    this.props.dispatch(alertActions.clear());
    this.onConfirmPass = this.onConfirmPass.bind(this);
  }
  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  onConfirmPass(e) {
    let c_password = this.state.c_password;
    c_password = e.target.value;
    this.setState({ c_password });
  }
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
  // function that verifies if two strings are equal
  compare = (string1, string2) => {
    if (string1 === string2) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    let registration = this.state.registration;
    registration[stateName] = event.target.value;
    this.setState({ registration });
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
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "has-success" });
          this.setState({ [stateNameEqualTo + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
          this.setState({ [stateNameEqualTo + "State"]: "has-danger" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
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

  terms_confirm = (e) => {
    this.setState({ terms_state: e.target.checked })
  }
  registerClick = () => {

    if (this.state.registerNameState === "") {
      this.setState({ form_state: false })
      this.setState({ registerNameState: "has-danger" });
    }
    if (this.state.registerEmailState === "") {
      this.setState({ form_state: false })
      this.setState({ registerEmailState: "has-danger" });
    }
    if (
      this.state.registerPasswordState === "" ||
      this.state.registerConfirmPasswordState === ""
    ) {
      this.setState({ form_state: false })
      this.setState({ registerPasswordState: "has-danger" });
      this.setState({ registerConfirmPasswordState: "has-danger" });
    }
    if (
      this.state.registerNameState === "has-success" &&
      this.state.registerEmailState === "has-success" &&
      this.state.registerPasswordState === "has-success" &&
      this.state.registerConfirmPasswordState === "has-success" &&
      this.state.terms_state === true
    ) {
      this.setState({ form_state: true });

      let user = {
        name: this.state.registration.registerName,
        email: this.state.registration.registerEmail,
        password: this.state.registration.registerPassword,
      }

      this.props.dispatch(userActions.register(user))
    }
  };
  componentDidUpdate(e) {
    const { registratered } = this.props.registration;
    if (registratered) {
      this.props.history.push('/auth/login')
      return (<Redirect to="/auth/login" />)
    }
  }
  render() {
    let {
      registerNameState,
      registerEmailState,
      registerPasswordState,
      registerConfirmPasswordState,
    } = this.state;

    return (
      <>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto" md="5">
                <div className="info-area info-horizontal mt-5">
                  <div className="icon icon-warning">
                    <i className="tim-icons icon-wifi" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Trello</h3>
                    <p className="description">
                      We've created the marketing campaign of the website. It
                      was a very interesting collaboration.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-triangle-right-17" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">GitHub</h3>
                    <p className="description">
                      We've developed the website with HTML5 and CSS3. The
                      client has access to the code using GitHub.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-info">
                    <i className="tim-icons icon-trophy" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Slack</h3>
                    <p className="description">
                      There is also a Fully Customizable CMS Admin Dashboard for
                      this product.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="7">
                <Card className="card-register card-white">
                  <CardHeader>

                    <CardTitle tag="h4">Register</CardTitle>
                    <CardImg
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Form className="form">
                      <InputGroup className={` ${registerNameState}`}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="name" type="text"
                          name="registerName"
                          value={this.state.registration.registerName}
                          onChange={e => this.change(e, "registerName", "length", 1)}
                        />
                        {/* {this.state.registerNameState === "has-danger" ? (
                              <label className="error">
                                This field is required.
                              </label>
                            ) : null} */}
                      </InputGroup>
                      <InputGroup className={` ${registerEmailState}`}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="text"
                          name="registerEmail"
                          value={this.state.registration.registerEmail}
                          onChange={e => this.change(e, "registerEmail", "email")} />
                        {/* {this.state.registerEmailState === "has-danger" ? (
                              <label className="error">
                                Please enter a valid email address.
                              </label>
                            ) : null} */}
                      </InputGroup>
                      <InputGroup className={` ${registerPasswordState}`}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password"
                          name="registerPassword"
                          value={this.state.registration.registerPassword}
                          onChange={e =>
                            this.change(e, "registerPassword", "password")
                          }
                        />
                        {/* {this.state.registerPasswordState === "has-danger" ? (
                        <label className="error">This field is required.</label>
                      ) : null} */}

                      </InputGroup>
                      <InputGroup className={`${registerConfirmPasswordState}`}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Confirm Password" type="password"
                          name="registerConfirmPassword"
                          value={this.state.registration.registerConfirmPassword}
                          onChange={e =>
                            this.change(
                              e,
                              "registerConfirmPassword",
                              "equalTo",
                              "registerPassword"
                            )
                          }
                        />
                        {/* {this.state.registerConfirmPasswordState ===
                        "has-danger" ? (
                          <label className="error">This field is required.</label>
                        ) : null} */}
                      </InputGroup>
                      <FormGroup check className="text-left">
                        <Label check>
                          <Input type="checkbox" name="terms_condition" onChange={e => this.terms_confirm(e)} />
                          <span className="form-check-sign" />I agree to the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            terms and conditions
                          </a>
                          .
                        </Label>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-round"
                      color="primary"
                      href="#pablo"
                      size="lg"
                      onClick={this.registerClick}
                      type="button"
                    // disabled={true}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

// export default Register;
function mapStateToProps(state) {
  const { users } = state;
  const { alert } = state;
  const { registration } = state;
  return {
    users,
    alert,
    registration
  };
}

export default connect(mapStateToProps)(Register)
