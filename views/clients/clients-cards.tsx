import * as React from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';

const ClientCard: React.FC<{ client: any; onClick: (id: string) => void }> = ({ client, onClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 1,
        cursor: 'pointer',
      }}
      onClick={() => onClick(client.id)}
    >
      <CardContent>
        <Typography color='#316b8f' sx={{ mb: 1, fontWeight: 'bold' }}>
          {client.fullName}
        </Typography>
        <Stack spacing={1}>
          <Typography>
            <strong>ID:</strong> {client.clientId}
          </Typography>
          <Typography>
            <strong>E-mail:</strong> {client.email}
          </Typography>
          <Typography>
            <strong>Último login:</strong> {client.lastLoginAt || 'N/A'}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const ClientsCards: React.FC<any> = ({
  data,
  customData,
  setSelectedDoc,
}) => {
  const rows = React.useMemo(() => {
    return data.map((item: any) => ({
      ...item,
    }));
  }, [data]);

  const getItem = React.useCallback(
    (id: string) => {
      return customData?.find((item: any) => item.id === id || item.uid === id) || {};
    },
    [customData]
  );

  const handleCardClick = React.useCallback(
    (id: string) => {
      setSelectedDoc(getItem(id));
    },
    [getItem, setSelectedDoc]
  );

  return (
    <Box width="100%" p={2}>
      {rows.map((row:any) => (
        <ClientCard key={row.clientId} client={row} onClick={handleCardClick} />
      ))}
    </Box>
  );
};

export default React.memo(ClientsCards);
