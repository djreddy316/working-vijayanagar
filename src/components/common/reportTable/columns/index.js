import React, { Component } from "react";
import { ColumnContainer, Cell, ColumnName, ColumnActions } from "./styles";
import { Checkbox } from "antd";

class Column extends Component {
  render() {
    const {
      columnsElements = [
         "Yard Name",
            "Rake number",
            "Wagon Number",
            "Batch Number",
			"Scanned By",
			"Batch Weight",
			"Size"
        ],
      filterFunction,
    } = this.props;
    return (
      <ColumnContainer>
        {columnsElements.map((element, i) => {
          return (
            <Cell size={i === 0 || element === "Email ID" ? 15 : null}>
              <ColumnName>
                {element}
              </ColumnName>
              <ColumnActions></ColumnActions>
            </Cell>
          );
        })}
      </ColumnContainer>
    );
  }
}

export default Column;
