import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "../YardManagement/userTable";
import AddYardForm from "../YardManagement/AddYardForm"
import { ManagementSection, BannerHeading } from "./styles";
import Panel from "../common/panel";
import  { Redirect } from 'react-router-dom'
import { selectYard} from "../../modals/YardManagement/selectors";
import { YardSetNameFilter } from "../../modals/YardManagement/actions";
import {
    fetchYard,
    deleteYard,
    addYard,
    updateYard,
} from "../../modals/YardManagement/thunk";
/* import {
    appSelectFilteredUsers,
} from "../../modals/app/selectors"; */
//import { appSelectFilteredZones } from "../../modals/app/selectors";


class YardManagement extends Component {
    state = {
        panelOpenType: "",
        activeUser: null,
    };
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo, "==>");
    }

    componentDidMount() {
    //    console.log('Api call started Here>');
        const { fetchYard } = this.props;
        fetchYard();
     //   console.log('Here==========================>');
    }

    toggleUserPanel = (panelOpenType) => {
        console.log("panel function inside ==>");
        this.setState({ panelOpenType });
        console.log('Panel Open Type :', panelOpenType);
    };

    editYard = (yard) => {
        this.setState({ panelOpenType: "edit", activeUser: yard });
    };

    handleDelete = (status) => {
        this.setState({ showconfirmation: status });
    };

    confirmDelete = (yard) => {
        const { deleteYard } = this.props;
        deleteYard(yard);
        this.handleDelete(false);
    };

    render() {
        if(localStorage.getItem("role_id")  == undefined)
        {
            return <Redirect to={'/login'} />;
        }
        const { panelOpenType, activeUser } = this.state;
        const {
            addYard,
            deleteYard,
            updateYard,
            yards,
            setSearchFilter,
        } = this.props;
        return (
            <ManagementSection>
                <BannerHeading>Yard Management</BannerHeading>
                <Table
                    action={this.toggleUserPanel}
                    rowData={yards.yard}

                    requiredElements={[
                        "name",
                        "description",
                        "latitude",
                        "longitude",
                        "radius"

                    ]}
                    columnsElements={[
                        "Yard Name",
                        "Description",
                        "Latitude",
                        "Longitude",
                        "Radius(in mts)"                     
                    ]}
                    panelType={panelOpenType}
                    editYard={this.editYard}
                    deleteYard={this.confirmDelete}
                    setSearchFilter={setSearchFilter}
                    perPage={10}
                />
                <Panel
                    panelType={panelOpenType}
                    isPanelOpen={Boolean(panelOpenType)}
                    Heading={
                        panelOpenType === "edit"
                            ? "Update Yard details"
                            : panelOpenType === "add"
                                ? "Add Yard"
                                : panelOpenType === "searchBy"
                                    ? "Search By"
                                    : null
                    }
                    closeAction={this.toggleUserPanel}
                >

                    {panelOpenType && (
                        <AddYardForm
                            cancelAction={this.toggleUserPanel}
                            addYard={addYard}
                            deleteYard={deleteYard}
                            preLoadedValues={activeUser}
                            isEditing={panelOpenType === "edit"}
                            updateYard={updateYard}
                        />
                    )}
                </Panel>
            </ManagementSection>
        );
    }
}

const mapStateToProps = (state) => ({
    yards: selectYard(state),
});

const mapDispatchToProps = {
    addYard: addYard,
    updateYard: updateYard,
    fetchYard: fetchYard,
    deleteYard: deleteYard,
    setSearchFilter: YardSetNameFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(YardManagement);
