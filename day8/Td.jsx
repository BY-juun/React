  
import React, { useContext, memo } from 'react';
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      };

    default:
      return {
        background: 'white',
      };
  }
}

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL :
      return '';
    case CODE.MINE : 
      return 'X';
    default :
      return '';
  }
}

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData } = useContext(TableContext);
  return (
    <td
      style = {getTdStyle(tableData[rowIndex][cellIndex])}
    >{getTdText(tableData[rowIndex][cellIndex])}</td>
  )
});

export default Td;