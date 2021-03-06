import * as React from 'react';
import { useState, useEffect } from "react";

import { useTheme, Typography, Container, Paper, Grid, Table, TableHead, TableBody, TableCell, TableFooter, TablePagination, TableRow, IconButton } from "@material-ui/core";
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';

import useStyles from "./Style";
// import axios from "axios";

import Web3 from "web3";

import { OptionContractAddress, OptionABI } from "./SmartContract";

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

interface IOption {
  amount:number, 
  buyer: string,
  exercised: boolean,
  expiry: number,
  id:number ,
  initPrice:number, 
  optionPrice: number,
  targetPrice: number,
  writer: string
}

// function OptionStatusStr(status: number) {
//   if (status === 0) {
//     return "OffSale";
//   } else if (status === 1) {
//     return "OnSale";
//   } else if (status === 2) {
//     return "Rented";
//   } else if (status === 3) {
//     return "Sold";
//   }
//   return "NoStatusExist";
// }

function OptionList(props: any) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayRows, setDisplayRows] = useState<IOption[]>([]);
  const [filter, setFilter] = useState({});

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, displayRows.length - page * rowsPerPage);

  // const web3 = new Web3((window as any).web3.currentProvider);

  useEffect(() => {
    // this.web3 = new Web3((window as any).web3.currentProvider);
    const web3 = new Web3((window as any).web3.currentProvider);
    const contract = new web3.eth.Contract(OptionABI as any, OptionContractAddress);

    web3.eth.getAccounts().then((account: any) => {
      const myAddress = account[0];
      web3.eth.defaultAccount = myAddress;
      console.log(myAddress);

      contract.methods.getOptsLength().call().then((optsLength: any) => {
        console.log(optsLength);

        for (let i = 0; i < optsLength; i++) {
          contract.methods.ftOpts(i).call().then((option: any) => {

            const tmpDisplayRows = displayRows;
            // contract.methods.cards(token).call().then((card: any) => {
            //   console.log(card);
            //   // axios.get("http://49.50.164.195:8888/v1/nft?id=" + card.toString()).then((val) => {
            //   console.log(val);
            //   tmpDisplayRows.push({ ID: i, Author: card.name, Name: card.level });
            //   setDisplayRows(tmpDisplayRows)
            //   setFilter({ ...filter, OffSale: true, OnSale: true, Rented: true, Sold: true })
            // });

            tmpDisplayRows.push({
              id:option.id as number,
              initPrice:option.initPrice as number,
              optionPrice:option.optionPrice as number,
              targetPrice:option.targetPrice as number,
              expiry:option.expiry as number,
              amount:option.amount as number,
              buyer:option.buyer as string,
              writer:option.writer as string,
              exercised: option.exercised as boolean
            });
            console.log(tmpDisplayRows);
            setDisplayRows(tmpDisplayRows)

            setFilter({ ...filter, OffSale: true, OnSale: true, Rented: true, Sold: true })
            // });
          });
        }
      });
    });
  }, []);

  // function createData(ID: number, Clarity: string, Cut: string, Carat: string, Color: string, Price: number, Status: string, Certification: string, Datetime: string) {
  //   console.log({ ID, Clarity, Cut, Carat, Color, Price, Status, Certification, Datetime });
  //   return { ID, Clarity, Cut, Carat, Color, Price, Status, Certification, Datetime };
  // }


  // async function getAllOption(account: string, contract: any) {
  //   // let account = await web3.eth.getAccounts();//.then((account: any) => {
  //   // const myAddress = account[0];
  //   // web3.eth.defaultAccount = myAddress;
  //   // console.log(account[0]);

  //   const nftCount = await contract.methods.balanceOf(account).call();
  //   console.log(nftCount);

  //   for (let i = 1; i < nftCount; i++) {
  //     const token = await contract.methods.tokenOfOwnerByIndex(account[0], i).call();
  //     console.log(token);
  //     // const tmpDisplayRows = displayRows;
  //     // for (let j = 0; j < r[0].length; j++) {
  //     //   tmpDisplayRows.push({ ID: r[0][j], Clarity: r[1][j], Cut: r[2][j], Carat: r[3][j], Color: r[4][j], Price: r[5][j], ReportHash: r[6][j], Status: r[7][j] });
  //     // }
  //     // setDisplayRows(tmpDisplayRows)
  //     // setFilter({ ...filter, OffSale: true, OnSale: true, Rented: true, Sold: true })
  //   }
  // }

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
    props.history.push("/DefiCare/Option/" + name.toString());
  }

  // function filterList(listType: string) {
  //   if (listType === "Option") {
  //     setFilter({ ...filter, type: listType })
  //   }
  //   else if (listType === "FT") {
  //     setFilter({ ...filter, type: listType })
  //   }
  //   else if (listType === "Option") {
  //     setFilter({ ...filter, type: listType })
  //   }
  // }

  // function handleChange(status: string) {
  //   setFilter({ ...filter, [status]: !filter[status] })
  // }


  console.log(displayRows);
  return (
    <Container maxWidth="lg" className={classes.rootcontainer}>
      <Grid container={true} className={classes.container}>
        <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
          <div className={classes.listImg}>
            <Typography variant="h4" color="textSecondary" className={classes.listText}>Put Option List</Typography>
          </div>
          <Paper style={{ textAlign: "right" }}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tablehead}>ID</TableCell>
                  <TableCell className={classes.tablehead} align="center">amount</TableCell>
                  <TableCell className={classes.tablehead} align="center">initPrice</TableCell>
                  <TableCell className={classes.tablehead} align="center">optionPrice</TableCell>
                  <TableCell className={classes.tablehead} align="center">targetPrice</TableCell>
                  <TableCell className={classes.tablehead} align="center">expiry</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayRows.map((row: any) => (
                  <TableRow key={row.id} hover={true} onClick={(e) => handleClick(e, row.id)}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">{row.initPrice}</TableCell>
                    <TableCell align="center">{row.optionPrice}</TableCell>
                    <TableCell align="center">{row.targetPrice}</TableCell>
                    <TableCell align="center">{row.expiry}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 33 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                    colSpan={8}
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
  );
}

export default OptionList;
