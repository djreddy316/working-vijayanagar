import React, { Component } from "react";
import { ColumnContainer, Cell, ColumnName, ColumnActions } from "./styles";
//import { Checkbox } from "antd";

class Column extends Component {
  render() {
    const {
      columnsElements = [
        "Name",
        "Description",
        "Longitude",
        "Latitude",
        "Radius"
        ],
      filterFunction,
    } = this.props;
    return (
      <ColumnContainer>
        {columnsElements.map((element, i) => {
          return (
            <Cell size={i === 1 ? 15 : 15}>
              <ColumnName>
                {element} {/*{i === 0 ? <Checkbox>{element}</Checkbox> : element}*/}
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
