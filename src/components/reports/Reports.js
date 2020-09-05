import React, {useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { forwardRef } from 'react';
import {DatePicker} from "antd";
//import {Container, Row, Col} from 'reactstrap';

import MaterialTable from "material-table";
import { AddBox, ArrowDownward, Search, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,ViewColumn,SaveAlt } from "@material-ui/icons";

//import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import {moment} from "moment";


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function Reports() {

    const url = " https://xlnlyl43dd.execute-api.ap-south-1.amazonaws.com/dev/loadscandata";
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const useStyles = makeStyles({
        table: {
            minWidth: 650
		}
    });

    const classes = useStyles();

    useEffect(() => {
        axios.post(url, {
            "from": "2020-08-01",
            "to": "2050-09-02"
        }).then(json => setData(json.data.data));
        setLoading(false);
    }, [])


    const handleEvent = (event, picker) => {
        console.log(picker.startDate);
    }

    const handleCallback = (start, end, label) => {
        let from = start.format('YYYY-MM-DD');
        let to = end.format('YYYY-MM-DD');
        axios.post(url, {
            from: from,
            to: to
        }).then(json => setData(json.data.data));
        setLoading(false);
    }

	const styles = { width: 260, display: 'block', marginBottom: 10 };

 	return !loading && <div> 
	{
		<div>



		<h1 style = {{color:"white"}}>Loading Tally check Report </h1>

<div>
<div style = {{marginLeft:"40%",marginTop:"0px", maxWidth: "300px",zIndex : '999',position:"relative"}}>
<h5 style = {{color:"white", fontSize:"16px"}}> Chose Date range to get the Report </h5>

</div>

</div>
	{
	<div style = {{width:"98%", marginTop:"-50px"}}>
	<MaterialTable style = {{background:"#0f1322",color:"#fff"}} className={classes.table} size="small" aria-label="a dense table"
	icons={tableIcons}	
	columns={[
	  { title: 'Yard', field: 'yard' },
	  {title: 'SAP Rakenumber',field: 'rakeno'},
	  {title: 'SAP Wagon Number',field: 'wagonno'},
	  { title: 'Loaded Wagon Number', field: 'wagonnumber', type: 'numeric' },
	  {title: 'SAP Batch Number',field: 'batchno'},
	  { title: 'Loaded Batch Number', field: 'batchnumber' },
	  {title: 'Scanned By',field: 'scannedby'},
	  {title: 'Image',field: 'url'}, 
	  {title: 'Anamoly',field: 'anamoly'},
	   {title: 'Action',field: ''},
	   {title: 'Taken By',field: ''},
	   {title: 'Action time',field: ''},
	]}
	data={data}
	options={{
	  search: true,
	  searchFieldStyle : { maxWidth : "30%",marginLeft : '65%'},
	showTitle: false,
	}}
  />
	</div>
	
	/* <TableContainer  style = {{background:"#0f1322"}} component={Paper}>
      <Table  style = {{background:"##0f1322"}} className={classes.table} size="small" aria-label="a dense table">
        <TableHead style = {{backgroundColor : "#CCC"}}>
		<TableRow>
		<TableCell align="center" colSpan={6} style= {{border:"1px solid"}}>Actual</TableCell>
		<TableCell align="center" colSpan={3} style= {{border:"1px solid",backgroundColor : "#AAA"}}>Planned</TableCell>
		<TableCell align="center" style= {{border:"1px solid",backgroundColor:"#FFC200"}}>Delta</TableCell>
		<TableCell align="center" colSpan={3} style= {{border:"1px solid",backgroundColor:"green"}}>Corrective Actions</TableCell>
		</TableRow>
          <TableRow>
            <TableCell align="right" style= {{border:"1px solid"}}>Yard</TableCell>
            <TableCell align="right" style= {{border:"1px solid"}}>Wagon Number</TableCell>
            <TableCell align="right" style= {{border:"1px solid"}}>Batch Number</TableCell>
            <TableCell align="right" style= {{border:"1px solid"}}>Scanned By</TableCell>
            <TableCell align="right" style= {{border:"1px solid"}}>Date</TableCell>
			<TableCell align = "center" style= {{border:"1px solid"}}>Image </TableCell>
			<TableCell align = "right" style= {{border:"1px solid",backgroundColor : "#AAA"}}>SAP Rakenumber </TableCell>
			<TableCell align = "right" style= {{border:"1px solid",backgroundColor : "#AAA"}}>SAP Wagon Number </TableCell>
			<TableCell align = "right" style= {{border:"1px solid",backgroundColor : "#AAA"}}>SAP Batchnumber </TableCell>
			<TableCell aling = "right" style= {{border:"1px solid",backgroundColor:"#FFC200"}}>Anamoly </TableCell>
			<TableCell aling = "right" style= {{border:"1px solid",backgroundColor:"#FFC200"}}>Action </TableCell>
			<TableCell aling = "right" style= {{border:"1px solid",backgroundColor:"#FFC200"}}>Action taken </TableCell>
			<TableCell aling = "right" style= {{border:"1px solid",backgroundColor:"#FFC200"}}>Action time </TableCell>
			
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,i) => (
            <TableRow key={i}>
              <TableCell style= {{color:"white"}} component="th" scope="row">
                {row.yard}
              </TableCell>
              <TableCell  style= {{color:"white"}} align="right">{row.wagonnumber}</TableCell>
              <TableCell style= {{color:"white"}} align="right">{row.batchnumber}</TableCell>
              <TableCell style= {{color:"white"}}  align="right">{row.scannedby}</TableCell>
			   <TableCell style= {{color:"white"}}  align="right">{row.date}</TableCell>
			    <TableCell  style= {{color:"white"}} align="center">{<a href = "" >image</a>}</TableCell>
				 <TableCell  style= {{color:"white"}} align="center">{row.rakeno}</TableCell>
				 <TableCell style= {{color:"white"}}  align="center">{row.wagonno}</TableCell> 
				 <TableCell style= {{color:"white"}}  align="center"></TableCell>
				 <TableCell style= {{color:"white"}}  align="center"></TableCell>
				  <TableCell style= {{color:"white"}}  align="center"></TableCell>
				 <TableCell style= {{color:"white"}}  align="center"></TableCell>
				 <TableCell style= {{color:"white"}}  align="center"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */
	
	}
		
	</div>
      
	}
	</div>

}
