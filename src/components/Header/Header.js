import React from "react";
import Logo from "../Logo/Logo";
import Settings from "../Settings/Settings";

const Header = () => {
  return (
    <header className="site-width flex justify-between align-items-center">
      <Logo />
      <Settings />
    </header>
  );
};

export default Header;
