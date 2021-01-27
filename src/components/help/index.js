import React from "react";
import "./help.css";

export default function help () {
  return (
  <div >
      <h3 className = { `help` } >Information</h3>
      <p className = { `help` } > Select the Yard from the list of Yards</p>
      <p className = { `help` } >Scan the Wagon number, by clicking "icon", point it to the wagon number and click on it.</p>
      <p className = { `help` } > Start Scanning the batch using the "icon" button and pointing it to the barcode.</p>
      <p className = { `help` } > For successful scan, you will see the Material Number and related information like Rake Number, Weight and Size.</p>
      <p className = { `help` } > If the data is not found in the loading report you will receive a pop-up "No Data Found". Please discuss the further actions with your supervisor.</p>
      <p className = { `help` } > After successful scan please proceed to scanning the next batch by click "icon" button.</p>
      <p className = { `help` } > Once wagon scan is complete, use the Wagon Complete button</p>
  </div>
  );
};

//export default help;