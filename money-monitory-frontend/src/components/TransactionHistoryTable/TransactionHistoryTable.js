import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { styled, Paper } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import { grey} from "@mui/material/colors";
import { mkConfig, generateCsv, download } from "export-to-csv";

const TableBox = styled(Paper)(({ theme }) => ({
  overflow: "hidden",
  borderRadius: "16px",
  marginLeft: "16px",
  marginTop: "16px",
  marginBottom: "16px",

  [theme.breakpoints.down("md")]: {
    marginRight: "16px",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode==='light'? "#3c1454":grey[800],
    color: "#FFFFFF",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(
  id,
  MerchantName,
  Description,
  DateOfTransaction,
  Amount,
  RoundUpAmount,
 
) {
  return {
    id,
    MerchantName,
    Description,
    DateOfTransaction,
    Amount,
    RoundUpAmount,
  };
}

const columns = [
  {
    minWidth: 100,
    label: "Merchant's Name",
    dataKey: "MerchantName",
    align: "center",
  },
  {
    minWidth: 120,
    label: "Description",
    dataKey: "Description",
    align: "center",
  },
  {
    minWidth: 120,
    label: "Date",
    dataKey: "DateOfTransaction",
    align: "center",
  },
  {
    minWidth: 100,
    label: "Amount to Merchant\u00A0(£)",
    dataKey: "Amount",
    numeric: true,
    align: "center",
  },
  {
    minWidth: 100,
    label: "Amount to Savings Account\u00A0(£)",
    dataKey: "RoundUpAmount",
    numeric: true,
    align: "center",
  },

];

const csvConfig = mkConfig({
  showColumnHeaders: true,
  useKeysAsHeaders: true,
  showLabels: true,
  filename: "TransactionHistory",
  title: " Round Up Transaction History",

});

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textalign: "center",
};

export default function TransactionHistoryTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const transactionRows = Array.from(
    { length: props.transactionDetailsArray.length },
    (_, index) => {
      return createData(index, ...props.transactionDetailsArray[index]);
    }
  );

  function handleDownloadTransactionHistory() {
    console.log("Downloaded");
    const csv = generateCsv(csvConfig)(props.transactionDetailsArray);
    download(csvConfig)(csv);
  }

  return (
    <Box sx={{ borderRadius: "30px" }}>
      <TableBox>
        <Box
          sx={{
            padding: "24px",
            fontSize: "1.125rem",
            fontWeight: 700,
          }}
        >
          <div>
            All Transactions
            <IconButton
              sx={{ float: "right" }}
              onClick={handleDownloadTransactionHistory}
            >
              {" "}
              <DownloadIcon />
            </IconButton>
          </div>{" "}
        </Box>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.dataKey}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const d = new Date(row["DateOfTransaction"]);
                  const date = d.toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                  let time = formatAMPM(d);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => {
                        setSelectedRow(row);
                        console.log({ selectedRow });
                        setOpen(true);
                      }}
                    >
                     <TableCell key="MerchantName">{row["MerchantName"]}</TableCell>
                      <TableCell key="Description">
                        {" "}
                        <div>
                          {" "}
                          <ListItem>
                          
                            <ListItemText primary={row["Description"]} />
                          </ListItem>
                        </div>
                      </TableCell>
                      <TableCell key="DateOfTransaction">
                        <Typography sx={{ fontSize: "0.875rem" }}>
                          {date}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.75rem", marginTop: "4px" }}
                        >
                          {time}
                        </Typography>
                      </TableCell>
                      <TableCell key="Amount" align="center">
                        {row["Amount"]}
                      </TableCell>
                      <TableCell key="RoundUpAmount" align="center">
                        {row["RoundUpAmount"].toFixed(2)}
                      </TableCell>
                     
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={transactionRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableBox>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Typography sx={{mt:2}} id="modal-modal-title" variant="h6" component="h2">
              To {selectedRow.MerchantName}
            </Typography>

            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontSize: "2.75rem" }}
            >
              £ {selectedRow.Amount}
            </Typography>
            <Typography sx={{mt:2}} id="modal-modal-title" variant="h6" component="h2">
               {selectedRow.Description}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontSize: ".975rem" }}
            >
              £ {selectedRow.RoundUpAmount} to Savings Account
            </Typography>
            <Divider
              variant="middle"
              sx={{ mt: 2, mb: 2, color: "#000000", opacity: "100%" }}
            />
            <div>
              {new Date(selectedRow.DateOfTransaction).toLocaleDateString(
                "en-us",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </div>
            <div>{formatAMPM(new Date(selectedRow.DateOfTransaction))}</div>
          </Box>
        </Modal>
      </div>
    </Box>
  );
}
