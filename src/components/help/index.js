import React from "react";
import "./help.css";

export default function help () {
  return (
  <div >
      <h3 className = { `help` } >Information</h3>
      <p className = { `help` } > Select the Yard from the list of Yards</p>
      <p className = { `help` } >Enter or Scan the Wagon number in Wagon number section</p>
      <p className = { `help` } > Start Scan the Batch using the Scan button</p>
      <p className = { `help` } > For Successful scan you see the Material number and related information like rake number, Weight and size</p>
      <p className = { `help` } > If the data is not found in the database you shall receive a pop-up "No Data found "</p>
      <p className = { `help` } > After successful scan please proceed scanning next batches</p>
      <p className = { `help` } > Once wagon scan complete use wagon complete button</p>
  </div>
  );
};

//export default help;