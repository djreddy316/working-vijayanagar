import React, { Component } from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ActionCells, ActionsBar, ActionText } from "./styles";
import SearchBar from "../../searchBar";
//import Button from "@material-ui/core/Button";

class ManageActionsBar extends Component {
  render() {
    const {

      actions = [
        { text: "Add Yard", icon: AddCircleIcon, type: "add", style: { background: "#2dd1ac" } },

      ],
      clickAction,
      panelType,
      setSearchFilter,
    } = this.props;
    // console.log("Search Filter ==>", setSearchFilter);
    return (
      <ActionsBar>
        {actions.map(({ text, icon: Icon, type }) => (
          <ActionCells
            onClick={() => clickAction(type)}
            isActive={panelType === type}
          >
            <Icon /> <ActionText>{text}</ActionText>
          </ActionCells>
        ))}
        {setSearchFilter && <SearchBar changeAction={setSearchFilter} />}
      </ActionsBar>
    );
  }
}

export default ManageActionsBar;
