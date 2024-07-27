import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllDoc = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('https://loopist-abidi_pro.mdbgo.io/api/documents');
      console.log(response.data);
      setDocuments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const columns = [
    { field: 'id', headerName: 'S.No', flex: 1 },
    { field: 'filename', headerName: 'File', flex: 2 },
    { field: 'sentBy', headerName: 'Provider', flex: 2 },
    { field: 'dated', headerName: 'Saved Date', flex: 2, valueFormatter: (params) => params.value.slice(0, 10) },
  ];

  const rows = documents.map((data, index) => ({
    id: index + 1,
    filename: data.filename,
    sentBy: data.sentBy,
    dated: data.dated,
    path: data.path,
  }));

  return (
   
        <Box className="main-content" flexGrow={1} p={2} style={{ fontFamily: 'Poppins' }}>
          <Typography variant="h4" gutterBottom>
            View Documents
          </Typography>
          <Box
            height="75vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: colors.blueAccent[700],
                borderBottom: 'none',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: colors.primary[400],
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: 'none',
                backgroundColor: colors.blueAccent[700],
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              onRowClick={(params) => window.open(`https://loopist-abidi_pro.mdbgo.io/${params.row.path}`, '_blank')}
            />
          </Box>
        </Box>
     
  );
};

export default AllDoc;
