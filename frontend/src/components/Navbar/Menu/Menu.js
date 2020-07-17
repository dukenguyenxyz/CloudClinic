import React from 'react';
import { Link } from '@reach/router';
import './Menu.scss';
import {
  User,
  Clipboard,
  MessageSquare,
  Calendar,
  Settings,
} from 'react-feather';

const Menu = () => {
  const iconSize = 20;
  // const [active, setActive] = useState(false);

  return (
    <div className="menu-wrapper">
      <ul>
        <li>
          <Link to="profile">
            <div className="menu-item">
              <div className="tab" />
              <User size={iconSize} />
              <span>Profile</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="patients">
            <div className="menu-item">
              <div className="tab" />
              <Clipboard size={iconSize} />
              <span>Patients</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="messaging">
            <div className="menu-item">
              <div className="tab" />
              <MessageSquare size={iconSize} />
              <span>Messaging</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="appointments">
            <div className="menu-item">
              <div className="tab" />
              <Calendar size={iconSize} />
              <span>Appointments</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="settings">
            <div className="menu-item">
              <div className="tab" />
              <Settings size={iconSize} />
              <span>Settings</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
