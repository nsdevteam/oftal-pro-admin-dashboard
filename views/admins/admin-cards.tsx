import * as React from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';

const AdminCard: React.FC<{ admin: any; onClick: (id: string) => void }> = ({ admin, onClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 1,
        cursor: 'pointer',
      }}
      onClick={() => onClick(admin.id)}
    >
      <CardContent>
        <Typography color='#316b8f' sx={{ mb: 1, fontWeight: 'bold' }}>
          {admin.fullName}
        </Typography>
        <Stack spacing={1}>
          <Typography>
            <strong>E-mail:</strong> {admin.email}
          </Typography>
          <Typography>
            <strong>Último login:</strong> {admin.lastLoginAt || 'N/A'}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );   
};

const AdminsCards: React.FC<any> = ({
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
        <AdminCard key={row.id} admin={row} onClick={handleCardClick} />
      ))}
    </Box>
  );
};

export default React.memo(AdminsCards);
