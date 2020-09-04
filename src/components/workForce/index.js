import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "../common/reportTable";
import { ManagementSection, BannerHeading } from "./styles";
import Panel from "../common/panel";
import AddUserForm from "./addUserForm";
import { sampleData } from "./sampleData";
import { workforceSelectWorkers } from "../../modals/workForceManagement/selectors";
import {
  fetchWorkForceWorkers,
  deleteWorkForceWorker,
  addWorkForceWorker,
  updateWorkForceWorker,
} from "../../modals/workForceManagement/thunk";
import {
  appFetchAllDesignations,
  appFetchAllUnits,
} from "../../modals/app/thunk";
import DeleConfirmationDailog from "../common/confirmationDailog";

class WorkForceManagement extends Component {
  state = {
    panelOpenType: "",
    activeUser: null,
    showDailog: false,
    deletingUser: null,
  };
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo, "==>");
  }

  componentDidMount() {
  const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
	}
    const { fetchUsers } = this.props;
    fetchUsers();
	fetch('https://xlnlyl43dd.execute-api.ap-south-1.amazonaws.com/dev/loadscandata',headers)
    .then(results => results.json())
    .then(data => {
        const users = data.results;
        this.setState({ users });
      }).catch(err => console.log(err))
  }

  toggleUserPanel = (panelOpenType) => {
    if (!panelOpenType) this.setUser(null);
    this.setState({ panelOpenType });
  };

  editUser = (user) => {
    this.setState({ panelOpenType: "edit", activeUser: user });
  };

  setUser = (user) => {
    this.setState({ activeUser: null });
  };

  showConfirmation = (user) => {
    const { showDailog } = this.state;
    this.setState({ showDailog: !showDailog, deletingUser: user });
    console.log("show dailog clicked ==>", !this.state.status, user);
  };

  confirmDelete = (user) => {
    const { deleteUser } = this.props;
    console.log("deleting user ==>", user);
    deleteUser(user);
    this.showConfirmation(null);
  };

  render() {
    const { panelOpenType, activeUser, showDailog, deletingUser } = this.state;
    const {
      addUser,
      updateUser,
      fetchUnits,
      fetchDesignations,
      workers,
    } = this.props;
    return (
      <ManagementSection>
        <BannerHeading>Loading Report</BannerHeading>
        <Table
         // action={this.toggleUserPanel}
          rowData={workers}
       
          
        />
       
        
      </ManagementSection>
    );
  }
}

const mapStateToProps = (state) => ({
  workers: workforceSelectWorkers(state),
});

const mapDispatchToProps = {
  addUser: addWorkForceWorker,
  updateUser: updateWorkForceWorker,
  fetchUsers: fetchWorkForceWorkers,
  deleteUser: deleteWorkForceWorker,
  fetchUnits: appFetchAllUnits,
  fetchDesignations: appFetchAllDesignations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkForceManagement);
