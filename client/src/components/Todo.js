import React from 'react';

export default class Todo extends React.Component {
  constructor(){
    super();
    this.state = {displayTitle: true};
  }

  setDisplayTitle(){
    this.setState({displayTitle: false})
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.setState({displayTitle: true});
      this.props.update(event.target.id, event.target.value)
    }
  }

  render(){
    return(
      <li>
        {this.state.displayTitle ? (
          <div className="title-todo" onDoubleClick={this.setDisplayTitle.bind(this)}>
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
            onClick={this.props.destroy.bind(this)}>
            Completa
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
