import React, { createRef, PureComponent,useRef } from 'react';

class Example extends PureComponent{

  state = {
    id : '',
    password : '',
    result : [],
  };

  inputRef = createRef();

  onChangeInputID = (e) => {
    this.setState({
      id : e.target.value
    })
  };

  onChangeInputPWD = (e) => {
    this.setState({
      password : e.target.value
    })
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    this.setState((prevState)=>{
      return{
        result : [...prevState.result,{id : this.state.id , password : this.state.password}] ,
        id : '',
        password : '',
      }
    })
  }

  renderResult = (params) =>{
    return params.id.length < 5
    ? <div>id : {params.id} , pwd : {params.password}</div>
    : null
  }

  render()
  {
    return(
      <>
        <form onSubmit={this.onSubmitForm}>
          <input onChange = {this.onChangeInputID} value = {this.state.id} type = "text"/>
          <input onChange = {this.onChangeInputPWD} value = {this.state.password} />
          <button>버튼</button>
        </form>
        {
          this.state.result.map((value,index)=>{
            return(
              this.renderResult(value)
            );
          })
        }
      </>
    );
  }
}

export default Example;