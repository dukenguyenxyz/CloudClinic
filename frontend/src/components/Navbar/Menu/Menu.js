import React from 'react';
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

  return (
    <div className="menu-wrapper">
      <ul>
        <li>
          <div className="menu-item">
            <div className="tab" />
            <User size={iconSize} />
            <span>Profile</span>
          </div>
        </li>
        <li>
          <div className="menu-item">
            <div className="tab" />
            <Clipboard size={iconSize} />
            <span>Patients</span>
          </div>
        </li>
        <li>
          <div className="menu-item">
            <div className="tab" />
            <MessageSquare size={iconSize} />
            <span>Messaging</span>
          </div>
        </li>
        <li>
          <div className="menu-item">
            <div className="tab" />
            <Calendar size={iconSize} />
            <span>Appointments</span>
          </div>
        </li>
        <li>
          <div className="menu-item">
            <div className="tab" />
            <Settings size={iconSize} />
            <span>Settings</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
