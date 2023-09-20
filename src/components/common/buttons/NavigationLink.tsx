import React from "react";
import { To } from "@remix-run/router";
import "./buttons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavigationLink: React.FC<{ name: String; pathName: any, icon:any }> = ({
  name,
  pathName,
  icon,
}) => {
    return (
      <a href={pathName} target="_blank">
      <div
      
        className={`nav-link-button`}
      >
        <div className="nav-link-button-icon">
        <FontAwesomeIcon icon={icon} />
        </div>
        {name}
      </div>
      </a>
  );
};

export default NavigationLink;
