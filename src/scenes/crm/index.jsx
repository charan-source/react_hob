import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {
  Search as SearchIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Initial ticket data
const initialTickets = [
  { id: 1, name: "Charan Palemala", email: "charan@gmail.com", phone: "1234567890", city: "Visakhapatnam", created: "14th March, 2025" },
  { id: 2, name: "Satya Narayana", email: "Satya@gmail.com", phone: "1234567890", city: "Visakhapatnam", created: "14th March, 2025" },
  { id: 3, name: "Rambabu bade", email: "john@gmail.com", phone: "1234567890", city: "New York", created: "15th March, 2025" },
  { id: 4, name: "Charan Palemala", email: "charan@gmail.com", phone: "1234567890", city: "Visakhapatnam", created: "14th March, 2025" },
  { id: 5, name: "Satya Narayana", email: "Satya@gmail.com", phone: "1234567890", city: "Visakhapatnam", created: "14th March, 2025" },
  { id: 6, name: "John Doe", email: "john@gmail.com", phone: "1234567890", city: "New York", created: "15th March, 2025" },
  { id: 7, name: "Charan Palemala", email: "charan@gmail.com", phone: "1234567890", city: "Visakhapatnam", created: "14th March, 2025" },
  { id: 8, name: "Satya Narayana", email: "Satya@gmail.com", phone: "1234567890", city: "Visakhapatnam", created: "14th March, 2025" },
  { id: 9, name: "John Doe", email: "john@gmail.com", phone: "1234567890", city: "New York", created: "15th March, 2025" },
];

// Columns for DataGrid
const columns = [
  { field: "id", headerName: "ID", flex: 0.4, headerClassName: "bold-header", disableColumnMenu: false, minWidth: 100 },
  { field: "name", headerName: "Name", flex: 2, headerClassName: "bold-header", disableColumnMenu: true, minWidth: 200 },
  { field: "email", headerName: "Email", flex: 1, headerClassName: "bold-header", disableColumnMenu: true, minWidth: 150 },
  { field: "phone", headerName: "Phone", flex: 1, headerClassName: "bold-header", disableColumnMenu: true, minWidth: 150 },
  { field: "city", headerName: "City", flex: 1, headerClassName: "bold-header", disableColumnMenu: true, minWidth: 150 },
  { field: "created", headerName: "Created", flex: 1, headerClassName: "bold-header", disableColumnMenu: true, minWidth: 150 },
];

const Crm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const Navigate = useNavigate();
  const [tickets, setTickets] = useState(initialTickets);

  // Search filter
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredTickets = initialTickets.filter((ticket) =>
      Object.values(ticket).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      )
    );
    setTickets(filteredTickets);
  };

  const handleNewTicket = () => {
    Navigate('/crmform');
  };

  const handleRowClick = (params) => {
    Navigate('/crmdetails', { state: { ticket: params.row } });
  };

  return (
    <Box m="20px">
      {/* Toolbar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} mb={2} flexDirection={isMobile ? "column" : "row"}>
        {/* Search Bar */}
        <Box display="flex" backgroundColor="#ffffff" borderRadius="3px" flex={1}>
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" onChange={handleSearchChange} />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          sx={{
            background: colors.blueAccent[500],
            fontWeight: "bold",
            color: "#ffffff",
            whiteSpace: "nowrap",
            textTransform: "none"
          }}
          startIcon={<AddIcon />}
          onClick={handleNewTicket}
        >
          Create New
        </Button>
      </Box>

      {/* DataGrid */}
      <Box height="70vh"
        m="13px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            overflowX: "auto",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "16px",
            whiteSpace: "nowrap",
            overflow: "visible",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontWeight: "bold !important",
            fontSize: "16px !important",
            color: "#ffffff",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold !important",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-row": {
            borderBottom: `0.5px solid ${colors.grey[300]}`,
          },
          "& .MuiTablePagination-root": {
            color: "#ffffff !important",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input": {
            color: "#ffffff !important",
          },
          "& .MuiTablePagination-displayedRows": {
            color: "#ffffff !important",
          },
          "& .MuiSvgIcon-root": {
            color: "#ffffff !important",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            color: "#ffffff",
          },
        }}>
        <DataGrid
          columns={columns}
          rows={tickets}
          pageSize={10}
          onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
};

export default Crm;