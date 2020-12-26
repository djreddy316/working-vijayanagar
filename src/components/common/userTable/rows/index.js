import React, { Component } from "react";
import { Checkbox } from "antd";
import { Cell } from "../columns/styles";
import {
  TableRowsContainer,
  TableRow,
  RowActionsWrapper,
  RowActionsAligner,
  Action,
} from "./styles";
import { Switch } from "antd";

class Row extends Component {
  render() {
    const {
      rowData = [],
      requiredElements = [
        "employeeid",
        "username",
        "firstname",
        "lastname",
        "biometricnumber",
        "phonenumber",
      ],
      deleteUser,
      editUser,
    } = this.props;
   // console.log("Resp Data", rowData);
    return (
      <TableRowsContainer>
        {rowData.map((row) => {
          return (
            <TableRow>
              {requiredElements.map((element, i) => (
                <Cell size={i === 0 || element === "email" ? 15 : null}>
                  {i === 0 ? (
                    <Checkbox>{row[element]}</Checkbox>
                  ) : element === "is_active" ? (
                    <Switch defaultChecked />
                  ) : (
                    `${row[element]}`
                  )}
                </Cell>
              ))}
              <RowActionsWrapper>
                <RowActionsAligner>
                  <Action onClick={() => editUser(row)}>Edit</Action>
                  <Action onClick={() => deleteUser(row)}>Delete</Action>
                </RowActionsAligner>
              </RowActionsWrapper>
            </TableRow>
          );
        })}
      </TableRowsContainer>
    );
  }
}

export default Row;
