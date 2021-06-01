import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
  conatiner: {
    overflowY: 'auto',
    maxHeight: 500,
    maxWidth: 800,
    marginTop: 30
  }
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  function createData(limitInf, limitSup, fo, fe, fefo) {
    return { limitInf, limitSup, fo, fe, fefo };
  }
  
  function createRows() {
      for(let i=0; i<props.chiSData.m; i++) {
          rows.push(createData(props.chiSData.limitsInf[i], props.chiSData.limitsSup[i], props.chiSData.fo[i], props.chiSData.fe[i], props.chiSData.fefo[i]));
      }
  }
  const rows = [];

  return (
    <TableContainer component={Paper} className={classes.conatiner}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>N</StyledTableCell>
            <StyledTableCell>Limite Inferior</StyledTableCell>
            <StyledTableCell align="left">Limite Superior</StyledTableCell>
            <StyledTableCell align="left">FO</StyledTableCell>
            <StyledTableCell align="left">FE</StyledTableCell>
            <StyledTableCell align="left">(FE-FO)^2 / FE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {createRows()}
          {rows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell align="left">{i+1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.limitInf}
              </StyledTableCell>
              <StyledTableCell align="left">{row.limitSup}</StyledTableCell>
              <StyledTableCell align="left">{row.fo}</StyledTableCell>
              <StyledTableCell align="left">{row.fe}</StyledTableCell>
              <StyledTableCell align="left">{row.fefo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}