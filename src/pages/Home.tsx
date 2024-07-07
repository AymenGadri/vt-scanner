import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/table';
import { Button, Box, Typography, Alert } from '@mui/material';
import MainContainer from '../components/MainContainer';
import { getDomainData, getUrlData, getIpData, getFileData } from '../services/virustotal';
import { transformDomainData, transformUrlData, transformIpData, transformFileData, transformFileHashData } from '../services/dataTransform';
import EditDialog from '../components/EditDialog';
import { GridRenderCellParams } from '@mui/x-data-grid';

const Home: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [hashTableData, setHashTableData] = useState<any[]>([]);
  const [editRow, setEditRow] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyLoaded, setApiKeyLoaded] = useState(false);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInputValue('');
    setFile(null);
    setTableData([]);
    setHashTableData([]);
    setShowNoDataMessage(false);
    setErrorMessage(null);
  }, [selectedType]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };



  const handleAnalyze = async () => {
    try {
      setLoading(true);

      if (selectedType === 'domain') {
        const data = await getDomainData(inputValue, apiKey);
        const transformedData = transformDomainData(data);
        setTableData(transformedData);
      }

      if (selectedType === 'url') {
        const data = await getUrlData(inputValue, apiKey);
        const transformedData = transformUrlData(data);
        setTableData(transformedData);
      }

      if (selectedType === 'ip') {
        const data = await getIpData(inputValue, apiKey);
        const transformedData = transformIpData(data);
        setTableData(transformedData);
      }

      if (selectedType === 'file') {
        if (file) {
          const data = await getFileData(file, apiKey);
          const transformedData = transformFileData(data);
          const transformedHashData = transformFileHashData(data);
          setHashTableData(transformedHashData);
          setTableData(transformedData);
        } else {
          throw new Error('No file selected or file is null.');
        }
      }
      setErrorMessage(null);
      setShowNoDataMessage(true);
    } catch (error) {
      console.error('Error analyzing data:', error);
      setErrorMessage(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row: any) => {
    setEditRow(row);
    setDialogOpen(true);
  };

  const handleDelete = (id: string | number) => {
    setTableData(tableData.filter(row => row.id !== id));
  };

  const handleSave = (row: any) => {
    if (editRow) {
      setTableData(tableData.map(r => (r.id === row.id ? row : r)));
    } else {
      setTableData([...tableData, { ...row, id: tableData.length + 1 }]);
    }
    setDialogOpen(false);
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handleApiKeySubmit = () => {
    console.log('API Key submitted:');
    setApiKeyLoaded(true);
    setTimeout(() => setApiKeyLoaded(false), 3000);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 250, editable: true },
    { field: 'analysisEngine', headerName: 'Analysis Engine', width: 250, editable: true },
    { field: 'category', headerName: 'Category', width: 250, editable: true },
    { field: 'result', headerName: 'Result', width: 250, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 170,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button onClick={() => handleEdit(params.row)} color="primary">Editer</Button>
          <Button onClick={() => handleDelete(params.row.id)} color="secondary">Supprimer</Button>
        </Box>
      ),
    },
  ];

  const columnsTwo = [
    { field: 'hash', headerName: 'File Hash', width: 150, editable: false },
    { field: 'result', headerName: 'ID', width: 500, editable: true },
  ];

  return (
    <Box    
     sx={{
      display: 'flex',
      backgroundColor: '#1C1C23'
    }}>
      <Box>
        <Sidebar onSelect={setSelectedType} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      </Box>
      <Box>
        <MainContainer
          drawerOpen={drawerOpen}
          selectedType={selectedType}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onAnalyze={handleAnalyze}
          apiKey={apiKey} // Pass apiKey
          onApiKeyChange={handleApiKeyChange}
          onApiKeySubmit={handleApiKeySubmit}
          file={file} // Pass file state
          onFileChange={handleFileChange}
        />
        {apiKeyLoaded && (
        <Box display="flex" justifyContent="center" width="100%">
          <Alert severity="success" onClose={() => setApiKeyLoaded(false)}>La clé API a été chargée avec succès !</Alert>
        </Box>
      )}
      {loading && (
        <Box display="flex" justifyContent="center" width="100%">
          <Alert severity="info">Chargement...</Alert>
        </Box>
      )}
      {tableData.length > 0 && <DataTable data={tableData} columns={columns} setData={setTableData} />}
      {hashTableData.length > 0 && <DataTable data={hashTableData} columns={columnsTwo} setData={setHashTableData} />}
      {showNoDataMessage && tableData.length === 0 && hashTableData.length === 0 && (
        <Box display="flex" justifyContent="center" width="100%" mt={2}>
          <Typography variant="h6" color="error">Pas de données disponibles. Essayez un autre {selectedType}</Typography>
        </Box>
      )}
      {errorMessage && (
        <Box display="flex" justifyContent="center" width="100%" mt={2}>
          <Typography variant="h6" color="error">{errorMessage}</Typography>
        </Box>
      )}
      </Box>
      <EditDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSave={handleSave} row={editRow} />
    </Box>
  );
};

export default Home;
