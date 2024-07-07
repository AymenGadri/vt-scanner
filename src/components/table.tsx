import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import EditDialog from './EditDialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface TableProps {
  data: any[];
  columns: GridColDef[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataTable: React.FC<TableProps> = ({ data, columns, setData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState<any | null>(null);

  const handleAddNewRow = () => {
    setEditRow(null);
    setDialogOpen(true);
  };

  const handleSave = (row: any) => {
    if (editRow) {
      setData(data.map(r => (r.id === row.id ? row : r)));
    } else {
      setData([...data, { ...row, id: data.length + 1 }]);
    }
    setDialogOpen(false);
  };

  const handleDownload = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const formattedData = data.map(item => ({ ...item }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: fileType });
    saveAs(dataBlob, `table_data${fileExtension}`);
  };

  return (
    <div style={{ height: 500, width: 'calc(100vw - 63px)', display: "flex", justifyContent: "center" }}>
      <div style={{ height: 500, width: '70%', justifyContent: "center" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          checkboxSelection
          sx={{
            '& .MuiDataGrid-root': { backgroundColor: '#1c1c1c', color: '#fff' },
            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#333333', color: '#000' },
            '& .MuiDataGrid-footerContainer': { backgroundColor: '#333333', color: '#000' },
            '& .MuiDataGrid-iconSeparator': { color: '#000', display: 'block !important' },
            '& .MuiCheckbox-root': { color: 'white' },
            '& .MuiDataGrid-selectedRowCount': { color: '#66bb6a' },
            '& .MuiTablePagination-root': { color: '#fff' },
            '& .MuiDataGrid-cell:hover': { color: '#fff' },
            '& .MuiPaginationItem-root': { color: '#fff' },
            '& .MuiDataGrid-sortIcon': { color: 'white' },
            '& .MuiSelect-icon': { color: 'white' },
            '& .MuiDataGrid-row': { color: 'white' },
          }}
        />
        <Button onClick={handleAddNewRow} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Ajouter une nouvelle ligne
        </Button>
        <Button onClick={handleDownload} variant="contained" color="secondary" style={{ marginTop: '16px', marginLeft: '8px' }}>
          Télécharger le fichier Excel
        </Button>
        <EditDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSave={handleSave} row={editRow} />
      </div>
    </div>
  );
};

export default DataTable;
