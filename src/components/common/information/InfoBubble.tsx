import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import "./InfoBubble.css";

const InfoBubble = (props: any) => {
  return (
    <div className="info-bubble-container">
      <div style={props.style} className="info-bubble-wrapper">
        <div className="info-icon-wrapper">
          {/* <FontAwesomeIcon icon={faCircleInfo}/> */}
          <span
            className={`material-symbols-outlined ${
              !props.conversion
                ? "info-material-icon"
                : "info-material-icon-conversion"
            }`}
          >
            info
          </span>
        </div>
        {!props.edge && <div className="mid-pointer"></div>}
        <div
          className={`${
            !(props.edge === true)
              ? "info-content-edges-wrapper"
              : "info-content-wrapper"
          }`}
        >
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default InfoBubble;
