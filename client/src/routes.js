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
import Calendar from "views/Calendar.jsx";
import Widgets from "views/Widgets.jsx";
import Charts from "views/Charts.jsx";
import Dashboard from "views/Dashboard.jsx";
import Expired from "./views/Projects/Expired";
import InProgress from "./views/Projects/InProgress";
import Finished from "./views/Projects/Finished";
import NewProject from "./views/Developer/NewDeveloper";
import AllProject from "./views/Projects/AllProject";
import AllDeveloper from "./views/Developer/AllDeveloper";
import WorkingDeveloper from "./views/Developer/Working";
import NoneWorkingDeveloper from "./views/Developer/NoneWorking";
import NewDeveloper from "./views/Developer/NewDeveloper";
import RejectedDeveloper from "./views/Developer/Rejected";
import LoginPage from "./views/pages/Login";
import Register from "./views/pages/Register";
import EditAllDevelopers from "./views/Developer/EditAllDevelopers";
import WorkspaceList from "./views/workcenter/WorkspaceList";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Project",
    rtlName: "صفحات",
    icon: "tim-icons icon-notes",
    state: "pagesCollapse",
    views: [
      {
        path: "/project/workspace",
        name: "Workspace",
        rtlName: "عالتسعير",
        mini: "W",
        rtlMini: "ع",
        component: WorkspaceList,
        layout: "/admin"
      },
      {
        path: "/project/all",
        name: "All",
        rtlName: "عالتسعير",
        mini: "A",
        rtlMini: "ع",
        component: AllProject,
        layout: "/admin"
      },
      {
        path: "/project/inprogress",
        name: "In Progress",
        rtlName: "صودعم رتل",
        mini: "I",
        rtlMini: "صو",
        component: InProgress,
        layout: "/admin"
      },
      {
        path: "/project/finished",
        name: "Finished",
        rtlName: "تيالجدول الزمني",
        mini: "F",
        rtlMini: "تي",
        component: Finished,
        layout: "/admin"
      },
      {
        path: "/project/expired",
        name: "Expired",
        rtlName: "هعذاتسجيل الدخول",
        mini: "E",
        rtlMini: "هعذا",
        component: Expired,
        layout: "/admin"
      },
      {
        path: "/project/new",
        name: "New",
        rtlName: "تسجيل",
        mini: "N",
        rtlMini: "صع",
        component: NewProject,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "Developer",
    rtlName: "المكونات",
    icon: "tim-icons icon-single-02",
    state: "componentsCollapse",
    views: [
      {
        path: "/developer/all",
        name: "All",
        rtlName: "وصفت",
        mini: "A",
        rtlMini: "ب",
        component: AllDeveloper,
        layout: "/admin"
      },
      {
        path: "/developer/working",
        name: "Working",
        rtlName: "نظام الشبكة",
        mini: "W",
        rtlMini: "زو",
        component: WorkingDeveloper,
        layout: "/admin"
      },
      {
        path: "/developer/none_working",
        name: "None Working",
        rtlName: "لوحات",
        mini: "N",
        rtlMini: "ع",
        component: NoneWorkingDeveloper,
        layout: "/admin"
      },
    ]
  },
  {
    path: "/widgets",
    name: "Tag Manage",
    rtlName: "الحاجيات",
    icon: "tim-icons icon-settings",
    component: Widgets,
    layout: "/admin"
  },
  {
    path: "/charts",
    name: "Activity",
    rtlName: "الرسوم البيانية",
    icon: "tim-icons icon-watch-time",
    component: Charts,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "",
    rtlName: "هعذاتسجيل الدخول",
    mini: "",
    rtlMini: "هعذا",
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "",
    rtlName: "تسجيل",
    mini: "",
    rtlMini: "صع",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/developer/edit/:id",
    name: "",
    rtlName: "تسجيل",
    mini: "",
    rtlMini: "صع",
    component: EditAllDevelopers,
    layout: "/admin"
  },
  {
    path: "/developer/create",
    name: "",
    rtlName: "تسجيل",
    mini: "",
    rtlMini: "صع",
    component: EditAllDevelopers,
    layout: "/admin"
  },
];

export default routes;
