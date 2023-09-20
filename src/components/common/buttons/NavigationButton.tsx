import React from "react";
import { Link, useLocation } from "react-router-dom";
import { To } from "@remix-run/router";
import "./buttons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavigationButton: React.FC<{ name: String; pathName: To, icon:any }> = ({
  name,
  pathName,
  icon,
}) => {
  const location = useLocation();
  return (
    <Link to={pathName}>
      <div
      
        className={`nav-link-button ${
          pathName === location.pathname ? "nav-link-button__active" : ""
        }`}
      >
        <div className="nav-link-button-icon">
        <FontAwesomeIcon icon={icon} />
        </div>
        {name}
      </div>
    </Link>
  );
};

export default NavigationButton;
