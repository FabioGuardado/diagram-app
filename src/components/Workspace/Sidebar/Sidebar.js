import React, { useState } from 'react';

import openSidebarIcon from '../../../img/open-sidebar.png';

import './Sidebar.css';

const Sidebar = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const toggleSidebar = () => setIsSidebarOpened(!isSidebarOpened);

  return (
    <div className="sidebar-container">
      <div
        className={`sidebar-panel ${
          isSidebarOpened ? 'sidebar-panel-active' : 'sidebar-panel-hidden'
        }`}
      >
        G
      </div>
      <button className="sidebar-toggler" onClick={toggleSidebar}>
        <img
          src={openSidebarIcon}
          height="24px"
          className={`sidebar-toggler-icon ${
            isSidebarOpened && 'sidebar-toggler-icon-reversed'
          }`}
        />
      </button>
    </div>
  );
};

export default Sidebar;
