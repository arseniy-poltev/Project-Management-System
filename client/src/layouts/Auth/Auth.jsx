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
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux"

import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import NotificationAlert from "react-notification-alert";
import routes from "routes.js";
import { alertActions } from '../../_actions';

class Pages extends React.Component {

  // constructor(props) {
  //   super(props);
  // }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  getFullPageName = routes => {
    let pageName = this.getActiveRoute(routes);
    switch (pageName) {
      case "Pricing":
        return "pricing-page";
      case "Login":
        return "login-page";
      case "Register":
        return "register-page";
      case "Lock Screen":
        return "lock-page";
      default:
        return "Default Brand Text";
    }
  };
  componentDidMount() {
    document.documentElement.classList.remove("nav-open");
  }

  handleNotification = (alert) => {
    let notifyMessage = alert.message;
    let options = {};
    options = {
      place: "tr",
      message: notifyMessage,
      type: alert.type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
    this.props.dispatch(alertActions.clear());
  };
  render() {
    
    const { alert } = this.props;
    if(alert.message) {
      this.handleNotification(alert);
    }

    return (
      <>
        <AuthNavbar brandText={this.getActiveRoute(routes) + " Page"} />
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className="rna-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <div className={"full-page " + this.getFullPageName(routes)}>
            <Switch>{this.getRoutes(routes)}</Switch>
            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}


function mapStateToProps(state) {
  const { alert } = state;
  const { users } = state;
  return {
    alert,
    users
  };
}
export default connect(mapStateToProps)(Pages)