import React, { Component } from 'react';
import NumberBaseball from '../day3/NumberBaseballClass';
import RSP from '../day5/RSPClass';
import Lotto from '../day6/LottoClass';


class GameMatcher extends Component {
    render() {
        if(this.props.match.params.name === 'number-baseball')
        {
            return <NumberBaseball />
        }
        else if(this.props.match.params.name === 'rock-scissors-paper')
        {
            return <RSP />
        }
        else if(this.props.match.params.name === 'lotto-generator')
        {
            return <Lotto />
        }
        else
        {
            return(
                <div>일치하는게임이 없습니다.</div>
            );
        }
    }
}

export default GameMatcher;