import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../Components/Navbars/Navbar.js";
import {useParams} from 'react-router-dom'
import Notifications from "@material-ui/icons/Notifications";

import routeurl from '../routes.js'
import styles from "../Style/Layout/layoutStyle.js";
import Viewclaim from "../View/Viewclaim.js";
import Chat from "../View/chat.js";

let ps;

const useStyles = makeStyles(styles);

export default function Layout({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  const getRoute = () => {
    return window.location.pathname !== "/nsure/viewclaim";
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
   
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
        routes = {routeurl}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
      {getRoute() === true ? (
          <div className={classes.content}>
            <div className={classes.container}><Chat roomid = {rest.match.params.roomid} /></div>
          </div>
        ) : (
          <div className={classes.content}>
            <div className={classes.container}><Viewclaim /></div>
          </div>
        )}
         
      </div>
    </div>
  );
}
