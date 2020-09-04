import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';


export default function Reports(){
	
const url = " https://xlnlyl43dd.execute-api.ap-south-1.amazonaws.com/dev/loadscandata";
const [data,setData] = useState([]);
const [loading,setLoading] = useState(true);
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const useStyles2 = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

 const classes = useStyles();
 const classes2 = useStyles2();
 
useEffect(() => {
    axios.get(url).then(json => setData(json.data.data));
	setLoading(false);
  }, [])

 	return !loading && <div> 
	{
		<div>
		<h1 style = {{color:"white"}}>Loading Tally check Report </h1>
		
		<div style = {{marginLeft : "70%"}}>
		<label style = {{color:"white"}}> From </label>
		<input type = "date" name = "from" value = "From " />
	  
		<label style = {{color:"white"}}> To </label>
		<input type = "date" name = "from" value = "From " />
		
		<input type = "submit" value = "Submit" style = {{marginLeft: "20px"}}/>
		</div>
	<TableContainer  style = {{background:"#0f1322"}} component={Paper}>
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
			<TableCell aling = "right" style= {{border:"1px solid",backgroundColor:"green"}}>Action </TableCell>
			<TableCell aling = "right" style= {{border:"1px solid",backgroundColor:"green"}}>Action taken </TableCell>
			<TableCell aling = "right" style= {{border:"1px solid",backgroundColor:"green"}}>Action time </TableCell>
			
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.yard}>
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
    </TableContainer>
		
	</div>
      
	}
	</div>

}
