  
import React, { useContext, memo } from 'react';
import {TableContext} from "./MineSearch";

const Td = memo(({ rowIndex, cellIndex }) => {
  const {tableData} = useContext(TableContext);
  return (
    <td>{tableData[rowIndex][cellIndex]}</td>
  )
});

export default Td;