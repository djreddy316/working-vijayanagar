import React, { Component } from "react";
//import { Checkbox } from "antd";
import { Cell } from "../columns/styles";
//import Pagination from "react-js-pagination";
import {
  TableRowsContainer,
  TableRow,
  RowActionsWrapper,
  RowActionsAligner,
  Action,
} from "./styles";
//import { Switch } from "antd";

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15
    };
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }


  render() {
    const {
      rowData,
      requiredElements = [
        "message",
        "description",
        "category",
      ],
      deleteYard,
      editYard,
    } = this.props;
    console.log("Data from ", rowData);
    return (
      <TableRowsContainer>
        { rowData &&
          rowData.map((row) => {
          return (
            <TableRow>
              {requiredElements.map((element, i) => (

                <Cell size={i === 1 ? 15 : 15}>
                  {row[element]}
                  
                </Cell>
              ))}
              <RowActionsWrapper>
                <RowActionsAligner>
                  <Action onClick={() => editYard(row)}>Edit</Action>
                  <Action onClick={() => deleteYard(row)}>Delete</Action>
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
