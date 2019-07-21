import React from "react";
import classNames from "classnames";
import { connect } from "react-redux"
import ReactBSAlert from "react-bootstrap-sweetalert";
import { BrowserRouter as Router, Route,  Redirect } from "react-router-dom";

// react component for creating dynamic tables
import ReactTable from "react-table";
import { userActions } from "../../_actions";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  Badge
} from "reactstrap";
import EditAllDevelopers from "./EditAllDevelopers";

class AllDevelopers extends React.Component {
  componentDidMount() {

    if(this.props.users && this.props.users.user_items) {

    } else {
      this.props.dispatch(userActions.getAll());
    }
    document.body.classList.toggle("all-developer");
  }

  componentWillMount() {
    document.body.classList.toggle("all-developer");
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      alert: null
    };
  }
  successDelete = (id) => {
    this.props.dispatch(userActions.delete(id));
    this.hideAlert();
  };
  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  add_new_user = () => {
    this.props.history.push('/admin/developer/create');
  }
  warningWithConfirmMessage = (id) => {
    this.setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete(id)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
          btnSize=""
        >
          This developer will be deactivated!
        </ReactBSAlert>
      )
    });
  };

  render() {

    const { users } = this.props;
    let table_data;
    if(this.state.next_page_data) {
      let url  = "/admin/developer/edit/" + this.state.next_page_data._id;
      return (<Redirect to= {url}/>)
    }
    if (users.user_items) {
      table_data = users.user_items.map((prop, key) => {
        let gender_label;
        if(prop.gender === "male") gender_label = "Male";
        else if(prop.gender === "female") gender_label = "Female"
        return {
          _id: key,
          name: prop.name,
          email: prop.email,
          gender: gender_label,
          age: prop.age,
          country: prop.country,
          active: prop.is_active ? (<Badge color="success" pill> Yes </Badge>) :  (<Badge color="danger" pill> No </Badge>),
          avata: (
            <div className="photo">
              <img className="avatar" src={prop.avata?prop.avata:"assets/img/placeholder.jpg"} alt=""/>
            </div>
          ),
          // office: prop[2],
          // age: prop[3],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              {/* <Link to="/admin/developer/edit"> */}
                <Button
                onClick={() => {
                  this.setState({next_page_data: prop})
                  // let obj = table_data.find(o => o._id === key);
                      return (
                        <Router>
                          <Route path="/admin/developer/edit" render= {() => { return EditAllDevelopers}}></Route>
                        </Router>
                      )
                }}
                color="warning"
                size="sm"
                className={classNames("btn-icon btn-link like", {
                  "btn-neutral": key < 5
                })}
              > 
                  <i className="tim-icons icon-pencil" />
                </Button>
                {/* <i className="tim-icons icon-pencil" /> */}
              {/* </Link> */}
              {" "}
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  var data = table_data;
                  data.find((o, i) => {
                    if (o._id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      return true;
                    }
                    return false;
                  });
                  this.warningWithConfirmMessage(prop._id);
                }}
                color="danger"
                size="sm"
                className={classNames("btn-icon btn-link like", {
                  "btn-neutral": key < 5
                })}
              >
                <i className="tim-icons icon-simple-remove" />
              </Button>{" "}
            </div>
          )
        };
      });
    }



    return (
      <>
        <div className="content">
          {this.state.alert}
          
          <Row>
          <Col md={8} className="ml-auto mr-auto">
                <h2 className="text-center">Developer Management Module</h2>
                <p className="text-center">
                  You can Create, Update, Delete all Developer in this panel.
                  This panel provides powerful developer management functions. 
                </p>
              </Col>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Developer Management</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <Button color="primary" onClick = {() => {
                        this.add_new_user()
                      }}>
                        <i className="tim-icons icon-minimal-add" />  Add
                      </Button>
                    </Col>
                  </Row>


                  {
                    users.user_items &&
                    <ReactTable
                      data={table_data}
                      filterable
                      resizable={false}
                      columns={[
                        {
                          Header: "Avata",
                          accessor: "avata",
                          sortable: false,
                          filterable: false
                        },
                        {
                          Header: "Name",
                          accessor: "name"
                        },
                        {
                          Header: "Email",
                          accessor: "email"
                        },
                        {
                          Header: "Country",
                          accessor: "country"
                        },
                        {
                          Header: "Gender",
                          accessor: "gender"
                        },
                        {
                          Header: "Age",
                          accessor: "age"
                        },
                        {
                          Header: "Active",
                          accessor: "active",
                          filterable: false
                        },
                        {
                          Header: "Actions",
                          accessor: "actions",
                          sortable: false,
                          filterable: false
                        }
                      ]}
                      defaultPageSize={10}
                      showPaginationTop
                      showPaginationBottom={false}
                      className="-striped -highlight"
                    />
                  }

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}


function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

export default connect(mapStateToProps)(AllDevelopers)
