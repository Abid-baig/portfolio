/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import appData from "../../data/app.json";

const Navbar = ({ lr, nr, theme }) => {
  return (
    <nav
      ref={nr}
      className={`navbar navbar-expand-lg change ${theme === "themeL" ? "light" : ""
        }`}
    >
      <div className="container">
        <Link href="/">
          <a className="logo">
            {theme ? (
              theme === "themeL" ? (
                <img ref={lr} src={`${appData.darkLogo}`} alt="logo" />
              ) : (
                <img ref={lr} src={`${appData.lightLogo}`} alt="logo" />
              )
            ) : (
              <img style={{borderColor: '1px solid while', borderRadius: '50px'}} width='100px' ref={lr} src={`${appData.logoColor}`} alt="logo" />
            )}
          </a>
        </Link>

        <button className="px-4 py-2 border border-white text-white rounded bg-transparent mr-2">
          HIRE ME
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
