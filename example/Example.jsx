import React, { createRef, PureComponent,useRef } from 'react';
import Example2 from './Example2.jsx';


class Example extends PureComponent{

  state = {
    id : '',
    password : '',
    result : '',
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
        result : this.state.id,
        id : '',
        password : '',
      }
    })
  }



  renderLogin = () => {
    return this.state.result === ''
      ? <form onSubmit={this.onSubmitForm}>
        <input onChange={this.onChangeInputID} value={this.state.id} type="text" placeholder = "ID"/>
        <input onChange={this.onChangeInputPWD} value={this.state.password} placeholder = "PWD"/>
        <button>버튼</button>
      </form>
      : null
  }

  

  WritePost = () => {
    return this.state.result !== ''
    ? <Example2 id = {this.state.result}/>
    : null
  }

  render()
  {
    return(
      <>
        {this.renderLogin()}
        {this.WritePost()}
      </>
    );
  }
}

export default Example;