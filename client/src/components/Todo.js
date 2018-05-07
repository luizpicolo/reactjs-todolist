import React from 'react';

export default class Todo extends React.Component {
  constructor(){
    super();
    this.state = {
      displayTitle: true,
      status: false
    };
  }

  setDisplayTitle(){
    this.setState({displayTitle: false})
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.setState({displayTitle: true});
      this.props.update(event.target.id, { title: event.target.value })
    }
  }

  todoComplete(status){
    console.log(status);
    return status ? 'title-todo-complete' : 'title-todo'
  }

  changeStatus(props){
    var status = !props.status
    this.setState({status: status});
    this.props.update(props.id, { status: status })
  }

  render(){
    return(
      <li>
        {this.state.displayTitle ? (
          <div className={this.todoComplete(this.props.status)} onDoubleClick={this.setDisplayTitle.bind(this)}>
            { this.props.title }
          </div>
        ) : (
          <textarea
            id={this.props.id}
            onKeyPress={this.handleKeyPress.bind(this)}>
            {this.props.title}
          </textarea>
        )}

        <div className="has-text-right actions">
          <button
            className='button is-success is-small'
            onClick={this.changeStatus.bind(this, this.props)}>
            {this.props.status ? 'Incompleta' : 'Completa'}
          </button>
          <button
            className='button is-danger is-small'
            onClick={this.props.destroy.bind(this)}>
            Excluir
          </button>
        </div>
      </li>
    );
  }
}
