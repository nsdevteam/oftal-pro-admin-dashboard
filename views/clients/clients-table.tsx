import * as React from 'react';
import { Box } from '../../elements';
import { ptPT } from '@mui/x-data-grid/locales';
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'clientId', headerName: 'ID', width: 150 },
  { field: 'fullName', headerName: 'Nome', width: 150 },
  { field: 'email', headerName: 'E-mail', width: 250 },
  { field: 'lastLoginAt', headerName: 'Último login',"width":150 }    
];

const ClientsTable: React.FC<any> = ({
  data,
  customData,
  setSelectedList,
  selectedList,
  setSelectedDoc,
  displaySelectCheckbox
}) => {
  const apiRef = useGridApiRef();
  const rows = React.useMemo(() => {
    return data.map((item:any) => ({
      ...item,
    }));
  }, [data]);

  const paginationModel = React.useMemo(
    () => ({
      page: 0,
      pageSize: 8,
    }),
    []
  );

  const getItem = React.useCallback(
    (id: string) => {
      return customData?.find((item:any) => item.id === id || item.uid === id) || {};
    },
    [customData]
  );

  const handleRowClick = React.useCallback(
    (params: any) => {
      setSelectedDoc(getItem(params?.row?.id || params?.row?.uid));
    },
    [getItem, setSelectedDoc]
  );  


  return (
    <Box width="100%">
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          className="orders-table"
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[8, 16, 32, 50]}
          checkboxSelection={displaySelectCheckbox}
          sx={{ border: 0 }}
          rowHeight={80}
          localeText={ptPT.components.MuiDataGrid.defaultProps.localeText}
          onRowClick={handleRowClick}     
          /* onRowSelectionModelChange={(newRows)=>setSelectedList(newRows)}     */
          rowSelectionModel={selectedList}    
          apiRef={apiRef}
        />
      </Paper>
    </Box>   
  );
};

export default React.memo(ClientsTable);
