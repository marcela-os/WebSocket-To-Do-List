import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

class App extends React.Component {
  static propTypes = {
    tasks: PropTypes.array,
    id: PropTypes.string,
  }

  state = {
    tasks: [],
    taskName: ''
  }


  componentDidMount() {
    this.socket = io('http://localhost:8000');

    this.socket.on('addTask', (task) => { this.addTask(task) });
    this.socket.on('removeTask', (id) => { this.removeTask(id) });
    this.socket.on('updateData', (tasks) => { this.updateTask(tasks) });
  } 

  updateTask(tasks) {
    this.setState({ tasks: tasks })
  };
  
  addTask(task) {
    this.state.tasks.push(task);
    this.setState(this.state.tasks);
    this.socket.emit('addTask', task);
  };

  submitForm(e) {
    e.preventDefault();
    this.addTask(this.state.taskName);
    this.socket.emit('addTask', this.state.taskName);
  };

  removeTask(id) {
    if (this.state.tasks.find(task => task.id === id)) {
      this.setState(this.state.tasks.splice(id, 1))
      this.socket.emit('removeTask', id)
    };
  };

  render() {
    const { tasks, id, taskName } = this.state;

    return (
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          
          <ul className="tasks-section__list" id="tasks-list">
          {tasks.map (task => (
                <li key={task.id}> {task}
                  <button className="btn btn--red" onClick={() => this.removeTask(id)}>Remove</button>
                </li>
            ))}
          </ul>
    
          <form id="add-task-form">
            <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" value={taskName} onChange={(e) => {this.setState({taskName: e.target.value})}}/>
            <button className="btn" type="submit" onClick={(e) => this.submitForm(e)}>Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;