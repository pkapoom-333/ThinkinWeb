import React from "react";
import AppBar from "./AppBar";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0, 71, 187, 1), rgba(229, 239, 254, 1))",
      }}
    >
      <AppBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Layout;
