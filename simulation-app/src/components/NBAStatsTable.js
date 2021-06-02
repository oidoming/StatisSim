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
    gridArea: 'stats'
  }
});

export default function NBAStatsTable(props) {
  const classes = useStyles();

  function createData(name, points, tc, threePoints, reb, ast, stl, blq) {
    return { name, points, tc, threePoints, reb, ast, stl, blq };
  }
  
  function createRows() {
    props.statsData.forEach((stats, index) => {
        rows.push(createData(stats.name, stats.points, stats.tc, stats.threePoints, stats.reb, stats.ast, stats.stl, stats.blq));
    });
  }
  const rows = [];

  return (
    <TableContainer component={Paper} className={classes.conatiner}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>N</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="left">Punots</StyledTableCell>
            <StyledTableCell align="left">TC%</StyledTableCell>
            <StyledTableCell align="left">TC3%</StyledTableCell>
            <StyledTableCell align="left">Reb</StyledTableCell>
            <StyledTableCell align="left">Ast</StyledTableCell>
            <StyledTableCell align="left">Stl</StyledTableCell>
            <StyledTableCell align="left">Blq</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {createRows()}
          {rows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell align="left">{i+1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.points}</StyledTableCell>
              <StyledTableCell align="left">{row.tc}</StyledTableCell>
              <StyledTableCell align="left">{row.threePoints}</StyledTableCell>
              <StyledTableCell align="left">{row.reb}</StyledTableCell>
              <StyledTableCell align="left">{row.ast}</StyledTableCell>
              <StyledTableCell align="left">{row.stl}</StyledTableCell>
              <StyledTableCell align="left">{row.blq}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}