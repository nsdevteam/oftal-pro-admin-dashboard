import { WithUid } from 'burnbase/firestore';
import { FC, useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import { FiSearch, FiX } from 'react-icons/fi';
import { RiFileExcel2Line } from 'react-icons/ri';

import { Box, Button, Input, Typography } from '../../elements';
import { IOrder, orderStatusEnum } from '../../interface';
import OrderForm from './order-form';
import { COLOR_LEGEND, TYPE_LEGEND } from './orders.data';
import OrderTable from './orders-table';
import { getAllData } from '../../utils/helpers';
import { orderCollectionName } from '../../api/orders/orders.utis';

const Orders: FC = () => {
  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<ReadonlyArray<WithUid<IOrder>>>([]);
  const [selectDoc, setSelectedDoc] = useState<WithUid<IOrder> | null>(null);

  useEffect(() => {
    getCompletedOrders().catch((error)=>console.error("Failed to retrieve completed orders ::: ",error));    
  }, []);

  const getCompletedOrders = async ()=>{
    const _data:any = await getAllData(orderCollectionName,[{field:'status', operator:'==', value:orderStatusEnum.Encomendado}])();
    const sortOrders = (a:any,b:any)=>{
      if(a?.createdAt > b?.createdAt){
        return 1;
      }else if(a?.createdAt < b?.createdAt){
        return -1;
      }else{
        return 0;
      }
    }
    setOrders(_data?.sort(sortOrders).reverse());        
    setLoading(false);   
  }
   
  const filterOrder = orders?.filter(({ ref, type, createdAt }) => {   
    const notValidText =
      filter && !ref.includes(filter) && !TYPE_LEGEND[type].includes(filter);

    const notValidDate =
      dateFilter &&
      createdAt &&
      new Date(dateFilter).toLocaleDateString() !==
        new Date(createdAt).toLocaleDateString();

    if (notValidText || notValidDate) return false;

    return true;
  });

  const csvData = useMemo(
    () => [
      [
        'Referência do pedido',
        'Tipo',
        'Índice de refração',
        'Cor',
        'Tratamento',
        'Diâmetro',
        'Olho',
        'Esférico',
        'Cilindro',
        'Eixo',
        'Adição',
        'Altura Mínima',
        'Prisma',
        'Precal',
        'Receita',
        'Observações',
      ],
      ...filterOrder.flatMap((order) => [
        [
          `${new Date(order.createdAt!)
            .toISOString()
            .split('T')[0]
            .replaceAll('-', '')}-${order.clientId}-${order.ref}`,
          TYPE_LEGEND[order.type],
          order.refractiveIndex,
          COLOR_LEGEND[order.color],
          order.treatment,
          order.diameter,
          'R',
          order.rightEye?.spherical ?? '--',
          order.rightEye?.cylinder ?? '--',
          order.rightEye?.axis ?? '--',
          order.rightEye?.addition ?? '--',
          order.minimumHeight ?? '--',
          order.prisma ? 'Sim' : '--',
          order.precal ?? '--',
          order.recipe ?? '--',
          order.observation ?? '--',
        ],
        [
          `${new Date(order.createdAt!)
            .toISOString()
            .split('T')[0]
            .replaceAll('-', '')}-${order.clientId}-${order.ref}`,
          TYPE_LEGEND[order.type],
          order.refractiveIndex,
          COLOR_LEGEND[order.color],
          order.treatment,
          order.diameter,
          'L',
          order.leftEye?.spherical ?? '--',
          order.leftEye?.cylinder ?? '--',
          order.leftEye?.axis ?? '--',
          order.leftEye?.addition ?? '--',
        ],
      ]),
    ],
    [filterOrder]
  );

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" gap="2rem" flexDirection="column">
        <Box
          gap="1rem"
          width="100%"
          display="flex"
          padding="0.5rem"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box className='order-options' display="flex" alignItems="center" gap="1rem">
            <Input
              name="date"
              type="date"
              width="100%"
              mr={['0', 'S']}
              ml={['0', 'S']}
              borderRadius="M"
              value={dateFilter}
              border="1px solid #E4E4E7"
              backgroundColor="transparent"
              className='date-input-filter'
              onChange={(e) => setDateFilter(e.target.value)}
            />
            {dateFilter && (
              <Button bg="#FC6363" onClick={() => setDateFilter(undefined)}>
                <FiX />
              </Button>
            )}
            <CSVLink filename="orders.csv" data={csvData}>
              <Button className='option-btn export-btn' disabled={loading}>
                <Typography as="span">Exportar</Typography>
                <Typography as="span" ml="M">
                  <RiFileExcel2Line size={18} color="#FFF" />
                </Typography>
              </Button>
            </CSVLink>
          </Box>
        </Box>
        <OrderTable customData={orders} setSelectedDoc={setSelectedDoc} data={filterOrder} />
      </Box>  
      {selectDoc && (
        <OrderForm
          doc={selectDoc}
          closeForm={() => setSelectedDoc(null)}
          isEditable={false}
        />
      )}
    </Box>
  );
};

export default Orders;
