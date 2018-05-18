import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.submit = this.submit.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }
  state = {
    todolist: [],
    todo: ''
  }
  submit(e) {
    e.preventDefault();
    const todo = this.state.todo;
    if(todo.length !== 0) {
      this.setState({
        todolist: [todo, ...this.state.todolist]
      })
    }
  }
  inputChange(e) {
    const _val = e.target.value;
    this.setState({
      todo: _val
    })
  }
  render() {
    const { todo, todolist } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.submit}>
          add todo: <input type="text" onChange={this.inputChange} value={todo}/>
        </form>
        <ul>
          {
            todolist.map((item, key)=> <li key={item}>
              {item}
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default App;
