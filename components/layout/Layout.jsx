import React from "react";
import classes from "../../styles/Layout.module.css";
import Navbar from "../layout/Navbar";
const Layout = (props) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className={classes.container}>
        <main className={classes.main}>{props.children}</main>
      </div>
      <footer className={classes.footer}>Footer</footer>
    </>
  );
};

export default Layout;
