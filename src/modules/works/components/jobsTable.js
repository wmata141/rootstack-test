import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { IoMdCreate } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import { PICK_UP } from '../../../reducers/alertReducer';

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
    minWidth: 700,
  },
});

const JobsTable = () => {
  const [jobs, setJobs] = useState([]);

  const dispatch = useDispatch()
  const state = useSelector(state => state.authReducer)

  useEffect(() => {
    infoUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const infoUser = async () => {
    const { token } = state
    try {
      const userRes = await axios.get(
        `https://coding-test.rootstack.net/api/jobs`,
        {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        }
      );

      console.log("User userRes ==>", userRes);
      if (userRes.data) {
        setJobs(userRes.data.data)
      } else {
        dispatch({ type: PICK_UP, payload: { open: true, severity: 'warning', message: `No existe ningun Trabajo` }})
      }            

    } catch (error) {
      console.log("error ==>", error);
    }
  };

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.title}</StyledTableCell>
              <StyledTableCell align="center">{row.description}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="right"><IoMdCreate /><TiDeleteOutline /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default JobsTable