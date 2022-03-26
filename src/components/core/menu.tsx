import { Link } from 'react-router-dom';
import { UserButtons } from './user-buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBookmark } from '@fortawesome/free-solid-svg-icons';

import './menu.scss';

export function Menu() {
  return (
    <div className="menu">
      <Link to="/Add">
        <div role="menuitem">
          <FontAwesomeIcon className="menu__icon" icon={faBookmark} />
        </div>
      </Link>
      <Link to="/AllLocations">
        <div role="menuitem">
          <FontAwesomeIcon className="menu__icon" icon={faBookmark} />
        </div>
      </Link>
      <div role="menuitem">
        <UserButtons />
      </div>
    </div>
  );
}
