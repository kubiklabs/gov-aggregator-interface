import NavigationButton from "../buttons/NavigationButton";
import { faFile, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

import DAO_DATA from "../../../config/dao_config.json";

const NavLinks = () => {
  return (
    <div className="navlinks-container">
      <NavigationButton icon={faFolderOpen} name={"All DAOs"} pathName="/" />
      {Object.keys(DAO_DATA).map((id) => {
        const data = DAO_DATA[id as keyof typeof DAO_DATA];

        return (
          <NavigationButton
            icon={faFile}
            name={`${id}. ${data.name}`}
            pathName={`/dao/${id}`}
          />
        );
      })}
    </div>
  );
};

export default NavLinks;
