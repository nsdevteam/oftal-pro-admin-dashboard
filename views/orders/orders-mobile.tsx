import * as React from 'react';
import { Box, Card, CardContent, Typography, Stack, Badge } from '@mui/material';
import { OrdersTableProps } from './orders.types';
import { COLOR_LEGEND, STATUS_LEGEND, TYPE_LEGEND } from './order-form/order-form.data';

const OrderCards: React.FC<{ order: any; onClick: (id: string) => void }> = ({ order, onClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 1,
        cursor: 'pointer',
      }}
      onClick={() => onClick(order.id)}
    >
      <CardContent>
        <Typography color='#316b8f' sx={{ mb: 1, fontWeight: 'bold' }}>
          Ref/Nome de Paciente: {order.ref}
        </Typography>
        <Stack spacing={1}>
          <Typography>
            <strong>Tipo:</strong> {order.type}
          </Typography>
          <Typography>
            <strong>Índice de Refração:</strong> {order.refractiveIndex}
          </Typography>
          <Typography>
            <strong>Cor:</strong> {order.color}
          </Typography>
          <Typography>
            <strong>Status:</strong>{' '}
            <Badge
              color={order.status === 'Encomendado' ? 'primary' : 'warning'}
              variant="dot"
              sx={{ ml: 1 }}
            >
              {order.status}
            </Badge>
          </Typography>
          <Typography>
            <strong>Esférico:</strong> D: {order.rightEye?.spherical || '--'} E: {order.leftEye?.spherical || '--'}
          </Typography>
          <Typography>
            <strong>Cilindro:</strong> D: {order.rightEye?.cylinder || '--'} E: {order.leftEye?.cylinder || '--'}
          </Typography>
          <Typography>
            <strong>Adição:</strong> D: {order.rightEye?.addition || '--'} E: {order.leftEye?.addition || '--'}
          </Typography>
          <Typography>
            <strong>Eixo:</strong> D: {order.rightEye?.axis || '--'} E: {order.leftEye?.axis || '--'}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const OrdersMobile: React.FC<OrdersTableProps> = ({
  data,
  customData,
  setSelectedDoc,
}) => {
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

  const getOrder = React.useCallback(
    (id: string) => {
      return customData?.find((item: any) => item.id === id || item.uid === id) || {};
    },
    [customData]
  );

  const handleCardClick = React.useCallback(
    (id: string) => {
      setSelectedDoc(getOrder(id));
    },
    [getOrder, setSelectedDoc]
  );

  return (
    <Box width="100%" p={2}>
      {rows.map((row) => (
        <OrderCards key={row.id} order={row} onClick={handleCardClick} />
      ))}
    </Box>
  );
};

export default React.memo(OrdersMobile);
