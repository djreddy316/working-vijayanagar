import React from "react";
import { NavLink } from "react-router-dom";
import WorkIcon from "@material-ui/icons/Work";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GroupIcon from "@material-ui/icons/Group";
import Dashboard from "../../assets/dashboard.png";
import ImgLink2 from "../../assets/link-2.jpg";
import ImgLink3 from "../../assets/link-3.jpg";
import ImgLink4 from "../../assets/link-4.jpg";
import ImgLink5 from "../../assets/link-5.jpg";
import Yard from "../../assets/yard.png";

import "./LeftNavigation.css";

function LeftNavigation(props) {
	
  return (
    <nav className={`nav ${props.navOpen}`}>
      <ul>
        <li>
          <NavLink className="flex" to="/dashboard">
            <span className="icon flex">
              <img src={Dashboard} alt="Link 1" />
            </span>
            <span className="text">Dashboard</span>
          </NavLink>
        </li>

        {localStorage.getItem("role_id") == 1 && (
          <li>
            <NavLink className="flex" to="/assignment">
              <span className="icon flex">
                <AssignmentIcon
                  height={32}
                  width={32}
                  style={{ width: "32px", height: "32px" }}
                />
              </span>
              <span className="text">Assignment</span>
            </NavLink>
          </li>
        )}

        {localStorage.getItem("role_id") == 1 && (
          <li>
            <NavLink className="flex" to="/manage-user">
              <span className="icon flex">
                <GroupIcon
                  height={32}
                  width={32}
                  style={{ width: "32px", height: "32px" }}
                />
              </span>
              <span className="text">User management</span>
            </NavLink>
          </li>
        )}
        {localStorage.getItem("role_id") == 1 && (
          <li>
            <NavLink className="flex" to="/manage-yard">
            <span className="icon flex">
              <img src={Yard} alt="Link 1" />
            </span>
              <span className="text">Yard management</span>
            </NavLink>
          </li>
        )}
        {(localStorage.getItem("role_id") == 1 ||
          localStorage.getItem("role_id") == 3) && (
          <li>
            <NavLink className="flex" to="/reports">
              <span className="icon flex" title="Report">
                <AssessmentIcon
                  height={32}
                  width={32}
                  style={{ width: "32px", height: "32px" }}
                />
              </span>
              <span className="text">Reports</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default LeftNavigation;
