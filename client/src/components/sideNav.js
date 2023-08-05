import React, {useEffect, useState} from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@fortawesome/fontawesome-free/css/all.css";
import styles from "../pages/dashboard.module.css";

import Link from "next/link";

export default function MysideNav() {
  const logout=()=>{
    localStorage.removeItem("token");
    window.location.href="/login";
  }

  return (
    <div>
    <SideNav className={styles.sidebar}>
      <SideNav.Toggle className={styles.toggle}/>
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="uservents" className={styles.navItem}>
          <NavIcon>
            <i
              className="fa-brands fas fa-space-awesome"
              style={{fontSize: "1.5em"}}
            />
          </NavIcon>
          <NavText><Link href="/dashboard">Home</Link>
          </NavText>
        </NavItem>
        <NavItem eventKey="building" className={styles.navItem}>
          <NavIcon>
            <i
              className="fas fa-building-shield"
              style={{fontSize: "1.5em"}}
            />
          </NavIcon>
          <NavText>
            <Link href="/building">Building</Link>
          </NavText>
        </NavItem>
        <NavItem eventKey="building" className={styles.navItem}>
          <NavIcon>
            <i
              className="fas fa-building-shield"
              style={{fontSize: "1.5em"}}
            />
          </NavIcon>
          <NavText>
            <div onClick={()=>{logout()}}>
            Logout
            </div>
          </NavText>
        </NavItem>

      </SideNav.Nav>

    </SideNav>
    </div>
  ); // Replace with your actual component for Building Page
}
