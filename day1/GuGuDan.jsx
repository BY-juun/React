const React = require('react');
const {useState,useRef} = React;

class GuGuDan extends React.Component{
              
    state = {
            first : Math.ceil(Math.random()*9),
            second : Math.ceil(Math.random()*9),
            value : '',
            result : '',
            result2 : '',
    };
    

    onSubmit = (e)=>{
                    e.preventDefault();
                    if(parseInt(this.state.value) === this.state.first * this.state.second)
                    {
                        this.setState((prevState)=>{
                            return {
                                result:"정답",
                                first : Math.ceil(Math.random()*9),
                                second : Math.ceil(Math.random()*9),
                                value : '',
                                result2 : prevState.value,
                            };
                        });
                        this.input.focus();
                    }
                    else{
                        this.setState({
                            result:"땡",
                            value : '',
                            result2:'',
                        });
                        this.input.focus();
                    }
                }
                
    onChange = (e)=>this.setState({value : e.target.value});
    input;

    render(){
        return (
            <>
                <div>{this.state.first}곱하기{this.state.second}는?</div>
                <form onSubmit = {this.onSubmit}> 
                    <input ref = {(c)=>{this.input = c}} type="number" value={this.state.value} onChange = {this.onChange}/>
                    <button></button>    
                </form>
                <div>{this.state.result2}{this.state.result}</div>
            </>
        );
    }
}         

module.exports = GuGuDan;