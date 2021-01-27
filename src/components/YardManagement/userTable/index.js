import React, { Component } from "react";
import Columns from "./columns";
import { TableContainer, TableActionsBar } from "./styles";
import ActionsBar from "./actionsBar";
import Rows from "./rows";

class Table extends Component {
  render() {
    const {
      rowData,
      columnsElements,
      action,
      editYard,
      panelType,
      requiredElements,
      deleteYard,
      confirmDelete,
      setSearchFilter,
    } = this.props;


    return (
      <TableContainer>
        <TableActionsBar>
          {/* <ActionsBar clickAction={action} panelType={panelType} setSearchFilter={setSearchFilter}/> */}
          <ActionsBar clickAction={action} panelType={panelType} />
        </TableActionsBar>
        <Columns columnsElements={columnsElements} />
        <Rows
          rowData={rowData}
          confirmDelete={confirmDelete}
          deleteYard={deleteYard}
          requiredElements={requiredElements}
          columnsElements={columnsElements}
          editYard={editYard}
        />
      </TableContainer>
    );
  }
}

export default Table;
