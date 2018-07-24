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
    this.handleTaskChange = this.handleTaskChange.bind(this);

  }
  loadTasksFromServer() {
    console.log('inside load');
    const token = localStorage.getItem('token');
    let config = {
      headers: {
        authorization: token,
      }
    }
    axios
      .get(this.props.url + 'users/current', config)
      .then(resCurrent => {
        let userId = resCurrent.data._id;
        axios
          .get(this.props.url + 'users/' + userId + '/tasks', config)
          .then(res => {
            this.setState({ data: res.data.response });
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });

  }
  handleTaskSubmit(task) {
    console.log('inside home task');
    const token = localStorage.getItem('token');
    let config = {
      headers: {
        authorization: token,
      }
    }
    let tasks = this.state.data;
    task.id = Date.now();
    let newTasks = tasks.concat([task]);
    // this.setState({ data: newTasks });
    console.log('task', task);
    axios
      .get(this.props.url + 'users/current', config)
      .then(resCurrent => {
        let userId = resCurrent.data._id;
        axios.put(this.props.url + 'users/'+userId+'/addTask', task, config).then((response) => {
          this.loadTasksFromServer();
        }).catch(err => {
          console.error(err);
          //this.setState({ data: tasks });

        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleTaskChange(task) {
    console.log('inside home task');
    const token = localStorage.getItem('token');
    let config = {
      headers: {
        authorization: token,
      }
    }
    // let tasks = this.state.data;
    // task.id = Date.now();
    // let newTasks = tasks.concat([task]);
    // this.setState({ data: newTasks });
    console.log('task', task);
    axios
      .get(this.props.url + 'users/current', config)
      .then(resCurrent => {
        let userId = resCurrent.data._id;
        axios.put(this.props.url + 'users/'+userId+'/removeTask', task, config).then((response) => {
          this.loadTasksFromServer();
        }).catch(err => {
          console.error(err);
          //this.setState({ data: tasks });

        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div style={style.commentBox}>
        <h2>Tasks:</h2>
        <TaskList data={this.state.data} onTaskChange={this.handleTaskChange}/>
        <TaskForm onTaskSubmit={this.handleTaskSubmit} />
      </div>
    );
  }
}
export default Home;
