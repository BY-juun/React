import React, { memo ,useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers(){
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((value,index)=>index+1);
  const shuffle = [];
  while(candidate.length > 0){
    shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length-1];
  const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c);
  return [...winNumbers,bonusNumber];
}

const Lotto = memo(() =>{
  const lottoNumbers = useMemo(()=>getWinNumbers(),[]); // 값을 기억 (getwinnumber의 return값)
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);


  const timeouts = useRef([]);

  useEffect(()=>{
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls)=>[...prevBalls,winNumbers[i]])
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000)
    return () => { // ComponentWillUnmount자리
      timeouts.current.forEach((value)=>{
        clearTimeout(value);
      })
    }
  },[timeouts.current]); // input이 빈 배열이면 componentDidmount와 동일
  //배열에 요소가 있으면 componentDidMount랑 조건맞으면 Didupdate 수행.

  const onClickRedo = useCallback(()=>{
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  },[winNumbers]);


  return(
    <>
      <div>당첨숫자</div>
      <div id = "결과창">
        {winBalls.map((v)=>
          <Ball key = {v} number = {v}/>)
        }
      </div>
      <div>보너스!</div>
      {bonus && <Ball number = {bonus}/>}
      {redo && <button onClick = {onClickRedo}>한번더!</button>}
      
    </>
  );
});


export default Lotto;

