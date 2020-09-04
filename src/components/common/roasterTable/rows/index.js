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
      rowData,
      requiredElements = [
        "yardname",
        "employeeid",
        "shift",
        "date",
		"firstname",
		"lastname",
		"biometricnumber"
      ]
    } = this.props;
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
            </TableRow>
          );
        })}
      </TableRowsContainer>
    );
  }
}

export default Row;
