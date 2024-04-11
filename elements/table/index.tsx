import React, { FC } from 'react';

import { TableProps } from '../../interface';
import { COLOR_LEGEND, TYPE_LEGEND } from '../../views/orders/orders.data';
import Box from '../box';
import Typography from '../typography';

const legends = {
  type: TYPE_LEGEND,
  color: COLOR_LEGEND,
};

const Table: FC<TableProps> = ({ data, columns, special, onSelect }) => {
  const columnKeys = Object.keys(columns);
  const columnValues = Object.values(columns);

  return (
    <Box mt="1rem" width="100%">
      <Box as="table" className="tableRequest" width="100%">
        <Box as="thead">
          <Box as="tr">
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
              <Box as="tr" key={rowIndex} onClick={() => onSelect(item)}>
                {columnKeys.map((columnKey, cellIndex) => (
                  <Box
                    as="td"
                    padding="1rem"
                    key={cellIndex}
                    borderBottom="1px solid #E4E4E7"
                  >
                    {special?.[columnKey] === 'date'
                      ? new Date(item[columnKey] as number).toLocaleDateString()
                      : (legends as any)[columnKey]?.[item[columnKey] as any] ??
                        item[columnKey]}
                  </Box>
                ))}
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Table;
