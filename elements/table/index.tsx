import React, { FC, useState } from 'react';
import { FaPen } from 'react-icons/fa';

import { TableProps } from '../../interface';
import ClientFormEdit from '../../views/clients/client-form-edit';
import { COLOR_LEGEND, TYPE_LEGEND } from '../../views/orders/orders.data';
import Box from '../box';
import Button from '../button';
import Typography from '../typography';

const legends = {
  type: TYPE_LEGEND,
  color: COLOR_LEGEND,
};

const Table: FC<TableProps> = ({ data, columns, special }) => {
  const columnKeys = Object.keys(columns);
  const columnValues = Object.values(columns);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleEdit = () => {
    try {
      setOpen(true);
      const sum = index++;
      console.log('Modal open');
    } catch (err) {
      console.log('Edit error :: ', err);
    }
  };

  return (
    <Box mt="1rem" width="100%">
      <Box as="table" className="tableRequest" width="100%">
        <Box as="thead">
          <Box as="tr" textAlign="left">
            {columnValues.map((column, index) => (
              <Box
                as="th"
                padding="1rem"
                borderBottom="1px solid #E4E4E7"
                color="#A1A1AA"
                key={index}
              >
                {column}
              </Box>
            ))}
          </Box>
        </Box>
        <Box as="tbody">
          {!data.length ? (
            <Box as="tr" textAlign="center" py="2rem">
              <td colSpan={columnKeys.length}>
                <Box width="100%">
                  <img src="/images/not-found.png" alt="Not found" />
                </Box>
                <Typography>Não foram encontrados resultados</Typography>
              </td>
            </Box>
          ) : (
            data.map((item, rowIndex) => (
              <Box as="tr" key={rowIndex}>
                {columnKeys.map((columnKey, cellIndex) => (
                  <Box
                    as="td"
                    padding="1rem"
                    key={cellIndex}
                    borderBottom="1px solid #E4E4E7"
                    onClick={handleEdit}
                  >
                    {special?.[columnKey] === 'date'
                      ? new Date(item[columnKey] as number).toLocaleDateString()
                      : (legends as any)[columnKey]?.[item[columnKey] as any] ??
                        item[columnKey] ?? (
                          <Button
                            bg="transparent"
                            disabled={loading}
                            //onClick={() => console.log('Modal aberto')}
                          >
                            <FaPen size={18} color="008000" />
                          </Button>
                        )}
                  </Box>
                ))}
              </Box>
            ))
          )}
          {isOpen && <ClientFormEdit closeForm={() => setOpen(false)} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Table;
