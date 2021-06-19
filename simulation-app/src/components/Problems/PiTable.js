import React, { useState } from 'react';
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
    marginTop: 30,
    textAlign: 'center',
    marginLeft: '25%',
    marginRight: '25%'
  }
});

export default function PiTable(props) {
  const classes = useStyles();

  function createData(n, randomNum1, randomNum2, r1R2, x) {
    return { n, randomNum1, randomNum2, r1R2, x };
  }
  
  function createRows() {
    props.piData.forEach((data, index) => {
        rows.push(createData(data.n, data.randomNum1, data.randomNum2, data.r1R2, data.x ));
    });
  }
  const rows = [];

  return (
    <TableContainer component={Paper} className={classes.conatiner}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>N</StyledTableCell>
            <StyledTableCell>1er Numero aleatorio</StyledTableCell>
            <StyledTableCell align="left">2do Numero aleatorio</StyledTableCell>
            <StyledTableCell align="left">raiz(R1^2 + R2^2)</StyledTableCell>
            <StyledTableCell align="left">Valor acumulado de X</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {createRows()}
          {rows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell align="left">{row.n}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.randomNum1}</StyledTableCell>
              <StyledTableCell align="left">{row.randomNum2}</StyledTableCell>
              <StyledTableCell align="left">{row.r1R2}</StyledTableCell>
              <StyledTableCell align="left">{row.x}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}