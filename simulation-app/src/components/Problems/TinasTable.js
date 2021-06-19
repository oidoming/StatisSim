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

export default function TinasTable(props) {
  const classes = useStyles();

  function createData(n, tina, randomNum, weight, accumulatedWeight, exceedCapacity) {
    return { n, tina, randomNum, weight, accumulatedWeight, exceedCapacity};
  }
  
  function createRows() {
    props.tinasData.forEach((data, index) => {
        rows.push(createData(data.n, data.tina, data.randomNum, data.weight, data.accumulatedWeight, data.exceedCapacity===true?'Si':'No'));
    });
  }
  const rows = [];

  return (
    <TableContainer component={Paper} className={classes.conatiner}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Corrida</StyledTableCell>
            <StyledTableCell>Tina</StyledTableCell>
            <StyledTableCell align="left">Numero aleatorio</StyledTableCell>
            <StyledTableCell align="left">Peso simulado</StyledTableCell>
            <StyledTableCell align="left">Peso acumulado</StyledTableCell>
            <StyledTableCell align="left">Capacidad excedida?</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {createRows()}
          {rows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell align="left">{row.n}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.tina}</StyledTableCell>
              <StyledTableCell align="left">{row.randomNum}</StyledTableCell>
              <StyledTableCell align="left">{row.weight}</StyledTableCell>
              <StyledTableCell align="left">{row.accumulatedWeight}</StyledTableCell>
              <StyledTableCell align="left">{row.exceedCapacity}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}