import React from 'react';
import Todo from './Todo';
import Config from '../../config';

class App extends React.Component {
  constructor() {
    super();
    this.state = {todos: []};
  }

  componentDidMount() {
    fetch(Config.urlTOServer)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({todos: result});
        },
        (error) => {
          this.setState({error});
        }
      )
  }

  createTodo(){
    fetch(Config.urlTOServer, {
      method: 'POST',
      headers: Config.headers,
      body: JSON.stringify({
        todo: {
          title: "Clique duas vezes para alterar a tarefa",
          status: false
        }
      })
    }).then(res => res.json())
      .then(
        (result) => {
          this.insertTodoinState(result)
        },
        (error) => {
          this.setState({error});
        }
      )
  }

  updateTodo(id, attr){
    fetch(Config.urlTOServer, {
      method: 'PUT',
      headers: Config.headers,
      body: JSON.stringify({
        todo: {
          id: id,
          attributes: attr
        }
      })
    }).then(res => res.json())
      .then(
        (result) => {
          this.updateTodoInState(result)
        },
        (error) => {
          this.setState({error});
        }
      )
  }

  destroyTodo(todo){
    fetch(Config.urlTOServer, {
      method: 'DELETE',
      headers: Config.headers,
      body: JSON.stringify({
        id: todo._id
      })
    }).then(res => res.json())
      .then(
        (result) => {
          this.destroyToInState(result)
        },
        (error) => {
          this.setState({error});
        }
      )
  }

  // Functions Helpers
  insertTodoinState(result){
    var todos = this.state.todos;
    todos.push(result);
    this.setState({todos: todos});
  }

  updateTodoInState(result){
    var todos = this.state.todos;
    var position = todos.findIndex(x => x._id == result._id);
    todos[position] = result
    this.setState({todos: todos});
  }

  destroyToInState(result){
    var todos = this.state.todos;
    todos.splice(todos.indexOf(result), 1);
    this.setState({todos: todos});
  }

  render(){
    var todos = this.state.todos;
    return(
      <div>
        <button
          className="button is-primary button-add"
          onClick={this.createTodo.bind(this)}>Adicionar Todo</button>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              destroy={this.destroyTodo.bind(this, todo)}
              update={this.updateTodo.bind(this)}
              title={todo.title}
              status={todo.status}
              key={index}
              id={todo._id}/>
          ))}
        </ul>
      </div>
    );
  }
}

export default App
