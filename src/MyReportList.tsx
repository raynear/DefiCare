import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core';
import { Typography, Container, Paper, Grid, Table, TableHead, TableBody, TableCell, TableFooter, TablePagination, TableRow, IconButton } from "@material-ui/core";
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';

import Web3 from "web3";
import axios from "axios";

import { WholeSaler } from "./SmartContract";

import useStyles from "./Style";

interface ITablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: ITablePaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.pagination}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}

interface INFT {
  Clarity: string;
  Cut: string;
  Carat: string;
  Color: string;
  GirdleCode: string;
  TokenID: string;
}

function MyReportList(props: any) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayRows, setDisplayRows] = useState<INFT[]>([])

  const web3 = new Web3((window as any).web3.currentProvider);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, displayRows.length - page * rowsPerPage);

  useEffect(() => {
    console.log(web3.givenProvider.selectedAddress);
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post('http://localhost:3333/getInfos/' + WholeSaler.toLowerCase()/*web3.givenProvider.selectedAddress*/, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      }
    }).then((response: any) => {
      const tmpDisplayRows = [];
      console.log(response.data);
      for (const i in response.data) {
        if (parseInt(i, 10) >= 0) {
          tmpDisplayRows.push({ Clarity: response.data[i].clarity, Cut: response.data[i].cut, Color: response.data[i].color, Carat: response.data[i].carat, GirdleCode: response.data[i].girdleCode, TokenID: response.data[i].tokenId });
        }
      }
      setDisplayRows(tmpDisplayRows);
    });
  }, [])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (e: React.MouseEvent<unknown>, name: string) => {
    props.history.push("/DefiCare/Report/" + name.toString());
  }
  // { Merchant, Clarity, Cut, Carat, Color, Price, Certification, Datetime };
  return (
    <>
      <Container maxWidth="lg" className={classes.rootcontainer}>
        <Grid container={true} className={classes.container}>
          <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
            <div className={classes.listImg}>
              <Typography variant="h4" color="textSecondary" className={classes.listText}>My Report List</Typography>
            </div>
            <Paper>
              <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tablehead} align="center">Clarity</TableCell>
                    <TableCell className={classes.tablehead} align="center">Cut</TableCell>
                    <TableCell className={classes.tablehead} align="center">Carat</TableCell>
                    <TableCell className={classes.tablehead} align="center">Color</TableCell>
                    <TableCell className={classes.tablehead} align="center">GirdleCode</TableCell>
                    <TableCell className={classes.tablehead} align="center">TokenID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0 ? displayRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : displayRows).map((row: any) => (
                    <TableRow key={row.GirdleCode} hover={true} onClick={(e) => handleClick(e, row.GirdleCode)}>
                      <TableCell align="center">{row.Clarity}</TableCell>
                      <TableCell align="center">{row.Cut}</TableCell>
                      <TableCell align="center">{row.Carat}</TableCell>
                      <TableCell align="center">{row.Color}</TableCell>
                      <TableCell align="right">{row.GirdleCode}</TableCell>
                      <TableCell align="right">{row.TokenID}</TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 33 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                      colSpan={6}
                      count={displayRows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MyReportList;
