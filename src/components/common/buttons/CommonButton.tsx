import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight } from "@fortawesome/free-solid-svg-icons";

const CommonButton = ({
  name,
  customClass,
  onClick,
}: {
  name: String;
  customClass: String | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <div className="common-button-container">
      <button className={`common-button ${customClass}`} onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

export default CommonButton;
