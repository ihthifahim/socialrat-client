import React from 'react'
import {Link} from 'react-router-dom';

export default function Sidebar() {
    return (
        <div>
            <div className="vertical-menu">
  <div data-simplebar className="h-100">
    {/*- Sidemenu */}
    <div id="sidebar-menu">
      {/* Left Menu Start */}
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title" key="t-apps">Menu</li>
        <li>
          <Link to="/dashboard" className="waves-effect">
            <i className="bx bx-calendar" />
            <span key="bx bxs-dashboard ">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="#" className="waves-effect">
            <i className="bx bx-stats" />
            <span key="t-chat">Campaign Tracker</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li><Link to="/all-campaigns" key="t-products">All Campaigns</Link></li>
            <li><Link to="/activity-overview" key="t-product-detail">Activity Overview</Link></li>
            
          </ul>
        </li>

        <li>
          <Link to="/clients" className="waves-effect">
            <i className="bx bx-user-voice" />
            <span key="t-chat">Clients</span>
          </Link>
        </li>
    
        
      </ul>
    </div>
    {/* Sidebar */}
  </div>
</div>
        </div>
    )
}
