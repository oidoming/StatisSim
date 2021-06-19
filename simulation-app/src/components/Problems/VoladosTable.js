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

export default function VoladosTable(props) {
  const classes = useStyles();

  function createData(run, beforeVolado, bet, randomNum, win, afterVolado, goal) {
    return { run, beforeVolado, bet, randomNum, win, afterVolado, goal };
  }
  
  function createRows() {
    props.voladosData.forEach((data, index) => {
        rows.push(createData(data.run, data.beforeVolado, data.bet, data.randomNum, data.win===true?'Si':'No', data.afterVolado, data.goal===true?'Si':'No'));
    });
  }
  const rows = [];

  return (
    <TableContainer component={Paper} className={classes.conatiner}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Corrida</StyledTableCell>
            <StyledTableCell>Antes del volado</StyledTableCell>
            <StyledTableCell align="left">Apuesta</StyledTableCell>
            <StyledTableCell align="left">Numero aleatorio</StyledTableCell>
            <StyledTableCell align="left">Se gano?</StyledTableCell>
            <StyledTableCell align="left">Despues del volado</StyledTableCell>
            <StyledTableCell align="left">Se llego a la meta?</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {createRows()}
          {rows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell align="left">{row.run}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.beforeVolado}</StyledTableCell>
              <StyledTableCell align="left">{row.bet}</StyledTableCell>
              <StyledTableCell align="left">{row.randomNum}</StyledTableCell>
              <StyledTableCell align="left">{row.win}</StyledTableCell>
              <StyledTableCell align="left">{row.afterVolado}</StyledTableCell>
              <StyledTableCell align="left">{row.goal}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}