import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Table from "../common/userTable";
import { ManagementSection, BannerHeading } from "./styles";
import Panel from "../common/panel";
import AddUserForm from "./addUserForm";
import { sampleData } from "./sampleData";
import { selectUsers } from "../../modals/userManagement/selectors";
import {
  fetchUsers,
  deleteUser,
  addUser,
  updateUser,
} from "../../modals/userManagement/thunk";
import {
  appFetchAllDesignations,
  appFetchAllUnits,
  appFetchAllRoles,
} from "../../modals/app/thunk";

class UserManagement extends Component {
  state = {
    panelOpenType: "",
    activeUser: null,
    data: false,
  };
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo, "==>");
  }
  
 componentDidMount() {
	  
    let url =
      "https://7fidxh52z5.execute-api.ap-south-1.amazonaws.com/prod/getsecurityusers";
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        this.setState({ data: resp });
      });
    });
 
  }

  toggleUserPanel = (panelOpenType) => {
    console.log("panel function inside ==>");
    this.setState({ panelOpenType });
  };

  editUser = (user) => {
    this.setState({ panelOpenType: "edit", activeUser: user });
  };

  handleDelete = (status) => {
    this.setState({ showconfirmation: status });
  };

  confirmDelete = () => {
    const { deleteUser } = this.props;
    deleteUser();
    this.handleDelete(false);
  };

  render() {
      if(localStorage.getItem("role_id")  == undefined)
      {
        return <Redirect to='/login'  /> 
      }
    const data = this.state.data;
    const { panelOpenType, activeUser } = this.state;
    const {
      addUser,
      deleteUser,
      updateUser,
      fetchUnits,
      fetchRoles,
      fetchDesignations,
      users,
    } = this.props;

    return (
     
      <ManagementSection>
        <BannerHeading>User Management</BannerHeading>
        <Table
          action={this.toggleUserPanel}
          rowData={this.state.data.data}
          requiredElements={[
            "employeeid",
            "username",
            "firstname",
            "lastname",
            "biometricnumber",
            "phonenumber",
          ]}
          columnsElements={[
            "Employee ID",
            "User Name",
            "First Name",
            "Last Name",
            "Biometric Number",
            "Phone Number",
          ]}
          panelType={panelOpenType}
          editUser={this.editUser}
          deleteUser={this.confirmDelete}
        />
        <Panel
          panelType={panelOpenType}
          isPanelOpen={Boolean(panelOpenType)}
          Heading={
            panelOpenType === "edit"
              ? "Update user details"
              : panelOpenType === "add"
              ? "Add user"
              : panelOpenType === "searchBy"
                       
          }
          closeAction={this.toggleUserPanel}
        >
          {panelOpenType && (panelOpenType === "add" || "edit") ? (
            <AddUserForm
              cancelAction={this.toggleUserPanel}
              addUser={addUser}
              deleteUser={deleteUser}
              fetchUnits={fetchUnits}
              fetchRoles={fetchRoles}
              fetchDesignations={fetchDesignations}
              preLoadedValues={activeUser}
              isEditing={panelOpenType === "edit"}
              updateUser={updateUser}
            />
          ) : null}
        </Panel>
      </ManagementSection>
    );
  }
}

const mapStateToProps = (state) => ({
  users: selectUsers(state),
});

const mapDispatchToProps = {
  addUser: addUser,
  updateUser: updateUser,
  fetchUsers: fetchUsers,
  deleteUser: deleteUser,
  fetchUnits: appFetchAllUnits,
  fetchDesignations: appFetchAllDesignations,
  fetchRoles: appFetchAllRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
