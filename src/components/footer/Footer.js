import React from "react";

function Footer() {
  return (
    <footer
      className="bg-dark text-light text-center py-2"
      style={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      <small>WLOPERA - {new Date().getFullYear()}</small>
    </footer>
  );
}

export default Footer;
