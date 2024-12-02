import * as React from 'react';
import { Box } from '../../elements';
import { OrdersTableProps } from './orders.types';
import { COLOR_LEGEND, STATUS_LEGEND, TYPE_LEGEND } from './order-form/order-form.data';
import { ptPT } from '@mui/x-data-grid/locales';
import { DataGrid, GridColDef, GridRowSelectionModel, useGridApiRef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'ref', headerName: 'Ref/Nome de pacicente', width: 300 },
  { field: 'type', headerName: 'Tipo', width: 130 },
  { field: 'refractiveIndex', headerName: 'Índice de refração', width: 130 },
  {
    field: 'color',
    headerName: 'Cor',
    type: 'string',
    width: 90,
  },
  {   
    field: 'status',
    headerName: 'Estado',
    width: 130,
    renderCell: (params) => (
      <div className="badge-wrapper">
        <span
          className={`badge ${
            params?.row?.status === 'Encomendado' ? 'badge-ongoing' : 'badge-warning'
          }`}
        >
          {params?.row?.status}
        </span>
      </div>
    ),
  },
  {
    field: 'spherical',
    headerName: 'Esférico',
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <>
        <strong>D: </strong>
        {params?.row?.rightEye?.spherical || '--'}
        <strong> E: </strong>
        {params?.row?.leftEye?.spherical || '--'}
      </>
    ),
  },
  {
    field: 'cylinder',
    headerName: 'Cilindro',
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <>
        <strong>D: </strong>
        {params?.row?.rightEye?.cylinder || '--'}
        <strong> E: </strong>
        {params?.row?.leftEye?.cylinder || '--'}
      </>
    ),
  },
  {
    field: 'addition',
    headerName: 'Adição',
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <>
        <strong>D: </strong>
        {params?.row?.rightEye?.addition || '--'}
        <strong> E: </strong>
        {params?.row?.leftEye?.addition || '--'}
      </>
    ),
  },
  {
    field: 'axis',
    headerName: 'Eixo',
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <>
        <strong>D: </strong>
        {params?.row?.rightEye?.axis || '--'}
        <strong> E: </strong>
        {params?.row?.leftEye?.axis || '--'}
      </>
    ),
  },
];

const OrderTable: React.FC<OrdersTableProps> = ({
  data,
  customData,
  setSelectedList,
  selectedList,
  setSelectedDoc,
  displaySelectCheckbox
}) => {
  const apiRef = useGridApiRef();
  const rows = React.useMemo(() => {
    return data.map((item) => ({
      ...item,
      uid: item.uid,
      //@ts-ignore
      id: item?.id || item.uid,
      ref: `${new Date(item?.createdAt || '')   
        .toISOString()
        .split('T')[0]
        .replace(/-/g, '')}-${item.clientId}-${item.ref || item.createdAt}`,
      type: TYPE_LEGEND[item.type] || '',
      color: COLOR_LEGEND[item.color] || '',
      refractiveIndex: item.refractiveIndex,
      status: STATUS_LEGEND[item.status] || 'Pendente',
    }));
  }, [data]);

  const paginationModel = React.useMemo(
    () => ({
      page: 0,
      pageSize: 8,
    }),
    []
  );

  const getOrder = React.useCallback(
    (id: string) => {
      return customData?.find((item:any) => item.id === id || item.uid === id) || {};
    },
    [customData]
  );

  const handleRowClick = React.useCallback(
    (params: any) => {
      setSelectedDoc(getOrder(params?.row?.id || params?.row?.uid));
    },
    [getOrder, setSelectedDoc]
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

export default React.memo(OrderTable);
