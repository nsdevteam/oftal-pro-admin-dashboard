import { WithUid } from 'burnbase/firestore';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import { FiSearch, FiX } from 'react-icons/fi';
import { RiFileExcel2Line } from 'react-icons/ri';

import { Box, Button, Input, Typography } from '../../elements';
import { IOrder, orderStatusEnum } from '../../interface';
import OrderForm from './order-form';   
import OrderTable from './orders-table';
import { getAllData } from '../../utils/helpers';
import { orderCollectionName } from '../../api/orders/orders.utis';
import OrdersMobile from './orders-mobile';
import FilterInput from '../../elements/filter-input';
import { COLOR_LEGEND, STATUS_LEGEND, TYPE_LEGEND } from './order-form/order-form.data';

const Orders: FC = () => {
  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<string>();
  const [filterOrder,setFilterOrders] = useState<ReadonlyArray<WithUid<IOrder>>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<ReadonlyArray<WithUid<IOrder>>>([]);
  const [selectDoc, setSelectedDoc] = useState<WithUid<IOrder> | null>(null);
  const [currentSearch,setCurrentSearch] = useState<string>('');

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
    const _orders = _data?.sort(sortOrders).reverse();
    setOrders(_orders);  
    setFilterOrders(_orders);        
    setLoading(false);      
  }
   

 const filterDateChange = (dateFilter:any)=>{
  const _data =  orders?.filter(({ ref, type, createdAt }) => {   
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
  setDateFilter(dateFilter);
  setFilterOrders(_data);
 }


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

  // Use useCallback to prevent re-creating the function on every render
  const handleSearchFilter = (result:any)=>{
    if(dateFilter){
      setDateFilter(undefined);
    }   
    setFilterOrders(result);
  }  

  const handleDateFilterResetCallback = useCallback(()=>{
    setFilterOrders(orders);   

  },[])

  const mapKeysByData = (item:WithUid<IOrder>)=>{
    //@ts-ignore
    console.log("Status ::: ",item,STATUS_LEGEND[item.status])
      return {
        ...item,
        ref: `${new Date(item?.createdAt || '')
          .toISOString()
          .split('T')[0]
          .replace(/-/g, '')}-${item.clientId}-${item.ref || item.createdAt}`,
        type: TYPE_LEGEND[item.type] || '',
        color: COLOR_LEGEND[item.color] || '',
        refractiveIndex: item.refractiveIndex,  
        status: STATUS_LEGEND[item.status]   
      }
  }   

  return (
    <div className='view-wrapper orders-wrapper'>
      <div className='view-header orders-header'>
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
              onChange={(e) => filterDateChange(e.target.value)}   
            />
            {dateFilter && (
              <Button bg="#FC6363" className='date-input-filter-btn' onClick={()=>handleDateFilterResetCallback()}>     
                <FiX />
              </Button>
            )}
            {/*@ts-ignore */}
            <CSVLink filename="orders.csv" data={csvData}>
              <Button className='option-btn export-btn' disabled={loading}>
                <Typography as="span">Exportar</Typography>
                <Typography as="span" ml="M">
                  <RiFileExcel2Line size={18} color="#FFF" />
                </Typography>
              </Button>
            </CSVLink>
      </div>
      <div className='view-content orders-content'>
      <div className='dis-dk'>
        <OrderTable customData={orders} setSelectedDoc={setSelectedDoc} data={filterOrder} />
        </div> 
        <div className='dis-mb'>
        <FilterInput mapKeysFn={mapKeysByData} data={orders} onFilter={handleSearchFilter}  />              
        <OrdersMobile customData={orders} setSelectedDoc={setSelectedDoc} data={filterOrder} />    
        </div>  
      </div>
      <div className='view-modal-silent'>
      {selectDoc && (   
        <OrderForm
          doc={selectDoc} 
          closeForm={() => setSelectedDoc(null)}
          isEditable={false}
        />
      )}
      </div>
    </div>
  );
};

export default Orders;
