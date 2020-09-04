import React, { Component } from "react";
import Columns from "./columns";
import { TableContainer, TableActionsBar } from "./styles";
import Rows from "./rows";
import ExcelReader from "../../file-upload/excel-reader";

class RoasterTable extends Component {
  render() {
    const {
      rowData,
      columnsElements,
      requiredElements,
        action,
        panelType,
    } = this.props;
    return (
        <div>
            <ExcelReader/>
          <TableContainer>
            <Columns columnsElements={columnsElements} />
            <Rows
              rowData={rowData}
              requiredElements={requiredElements}
              columnsElements={columnsElements}
            />
          </TableContainer>
        </div>
    );
  }
}

export default RoasterTable;
