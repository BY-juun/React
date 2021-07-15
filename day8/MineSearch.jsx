import React, { useEffect, useReducer, useCallback, memo, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
}


export const TableContext = createContext({ //이안에는 초기값
  tableData: [],
  dispatch: () => { }, //모양만 맞춰줌
});

const initialState = {
  tableData: [],
  timer: 0,
  result: 0,
}

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
}

export const START_GAME = 'START_GAME'

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      }
    default:
      return state;
  }
}

const MineSearch = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({
    tableData: state.tableData,
    dispatch
  }),
    [state.tableData]); //dispatch는 변하지 않음.

  return (
    <TableContext.Provider value={value}> {/*이 아래에서 context api사용(tableData, dispatch사용)*/}
      <Form dispatch>
        <div>{state.timer}</div>
      </Form>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  )
});

export default MineSearch;