import React from 'react';
import { BrowserRouter ,Route, Link} from 'react-router-dom';

import GameMatcher from './GameMatcher';

const Games = () => {
  return(
      <BrowserRouter>
        <Link to = '/game/number-baseball'>숫자야구</Link>
        &nbsp;
        <Link to = '/game/rock-scissors-paper'>가위바위보</Link>
        &nbsp;
        <Link to = '/game/lotto-generator'>로또생성기</Link>
        &nbsp;
        <Link to = '/game/index'>게임매쳐</Link>
        <div>
          <Route path = '/game/:name' component = {GameMatcher}></Route>
        </div>
      </BrowserRouter>
  );
}

export default Games;