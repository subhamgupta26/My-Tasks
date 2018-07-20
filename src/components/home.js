//CommentBox.js
import React, { Component } from 'react';
import TaskList from './taskList';
import TaskForm from './taskForm';
// import CommentForm from './CommentForm';
import axios from 'axios';
import DATA from '../data';
import style from '../style';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('constructor called');
    this.state = { data: [] };
    this.loadTasksFromServer(); // = this.loadTasksFromServer.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
  }
  loadTasksFromServer() {
    console.log('inside load');
    axios
      .get(this.props.url + 'users/5b5049a0e81ef56e1013d40c/tasks')
      .then(res => {
        this.setState({ data: res.data.response });
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleTaskSubmit(task) {
      console.log('inside home task');
    let tasks = this.state.data;
    task.id = Date.now();
    let newTasks = tasks.concat([task]);
    // this.setState({ data: newTasks });
    console.log('task',task);
    axios.put(this.props.url+'users/5b5049a0e81ef56e1013d40c/addTask', task).then((response)=>{
        this.loadTasksFromServer();
    }).catch(err => {
      console.error(err);
      //this.setState({ data: tasks });
      
    });
  }

  render() {
    return (
      <div style={style.commentBox}>
        <h2>Tasks:</h2>
        <TaskList data={this.state.data} />
        <TaskForm onTaskSubmit={this.handleTaskSubmit} />
      </div>
    );
  }
}
export default Home;
